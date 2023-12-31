package com.lukasschreiber.potlucksheet.controller

import com.lukasschreiber.potlucksheet.model.User
import com.lukasschreiber.potlucksheet.model.dto.ErrorResponse
import com.lukasschreiber.potlucksheet.model.dto.FieldErrorDto
import com.lukasschreiber.potlucksheet.model.dto.UserDto
import com.lukasschreiber.potlucksheet.services.UserService
import jakarta.validation.Valid
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.ReactiveAuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.AuthenticationException
import org.springframework.security.core.context.SecurityContext
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.ReactiveUserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.web.bind.annotation.*
import org.springframework.web.bind.support.WebExchangeBindException
import org.springframework.web.server.ServerWebExchange
import reactor.core.publisher.Mono


@RestController
@RequestMapping("/api/auth")
class AuthController(
    @Autowired val userService: UserService,
    @Autowired private val userDetailsService: ReactiveUserDetailsService,
    @Autowired val authenticationManager: ReactiveAuthenticationManager
) {
    @PostMapping("/login")
    fun login(@RequestBody @Valid user: User): Mono<ResponseEntity<UserDto?>> {
        val authenticationToken = UsernamePasswordAuthenticationToken(user.name, user.password)

        return userService.userRepository.findByName(user.name)
            .switchIfEmpty(Mono.defer {
                Mono.error<User>(UsernameNotFoundException("User not found"))
            })
            .flatMap { foundUser ->
                authenticationManager.authenticate(authenticationToken)
                    .then(Mono.just(ResponseEntity.ok(foundUser.toDto())))
                    .onErrorResume {
                        Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null))
                    }
            }
            .onErrorResume {
                Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null))
            }
    }

    @PostMapping("/register")
    fun registration(
        @RequestBody @Valid user: User,
        exchange: ServerWebExchange
    ): Mono<ResponseEntity<*>> {
        val rawPassword = user.password
        return userService.registerUser(user)
            .flatMap { registeredUser ->
                val authToken = UsernamePasswordAuthenticationToken(registeredUser.name, rawPassword)

                authenticationManager.authenticate(authToken).flatMap { authentication ->
                    val context: SecurityContext = SecurityContextHolder.getContext()
                    context.authentication = authentication
                    exchange.session.flatMap { session ->
                        session.attributes[SecurityContext::class.java.name] = context
                        val responseEntity: ResponseEntity<*> = ResponseEntity.ok<Any>(registeredUser.toDto())
                        Mono.just(responseEntity)
                    }
                }
            }
    }
}