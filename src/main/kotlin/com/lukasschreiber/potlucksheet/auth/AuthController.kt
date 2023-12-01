package com.lukasschreiber.potlucksheet.auth

import com.lukasschreiber.potlucksheet.user.User
import com.lukasschreiber.potlucksheet.user.UserService
import jakarta.validation.Valid
import kotlinx.coroutines.reactor.awaitSingle
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.ReactiveAuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContext
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.ReactiveUserDetailsService
import org.springframework.security.web.authentication.WebAuthenticationDetails
import org.springframework.security.web.server.context.WebSessionServerSecurityContextRepository.DEFAULT_SPRING_SECURITY_CONTEXT_ATTR_NAME
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ModelAttribute
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.server.ServerWebExchange
import reactor.core.publisher.Mono
import java.security.Principal


@Controller
class AuthController(
    @Autowired val userService: UserService,
    @Autowired val authenticationManager: ReactiveAuthenticationManager
) {

    @Value("\${app.potluck-sheet.version}")
    private lateinit var appVersion: String

    @Value("\${app.potluck-sheet.build-year}")
    private lateinit var buildYear: String

    @GetMapping("/")
    suspend fun index(model: Model, principal: Principal): String {
        model.addAttribute("version", appVersion)
        model.addAttribute("buildYear", buildYear)
        model.addAttribute("user", userService.userRepository.findByName(principal.name).awaitSingle())
        return "index"
    }

    @GetMapping("/login")
    fun login(model: Model): String {
        return "login"
    }

    @GetMapping("/register")
    fun register(model: Model): String {
        model.addAttribute("user", User())
        return "register"
    }

    @PostMapping("/register")
    fun registration(
        @ModelAttribute("user") @Valid user: User,
        result: BindingResult,
        model: Model,
        exchange: ServerWebExchange
    ): Mono<String> {
        val rawPassword = user.password
        return userService.registerUser(user)
            .flatMap { registeredUser ->
                model.addAttribute("user", registeredUser)
                val authToken = UsernamePasswordAuthenticationToken(registeredUser.name, rawPassword)

                authenticationManager.authenticate(authToken).flatMap { authentication ->
                    val context: SecurityContext = SecurityContextHolder.getContext()
                    context.authentication = authentication
                    exchange.session.flatMap {
                        session -> session.attributes[DEFAULT_SPRING_SECURITY_CONTEXT_ATTR_NAME] = context
                        Mono.just("redirect:/")
                    }
                }
            }
            .onErrorResume { exception ->
                if (exception is UserService.UserExistsException) {
                    result.rejectValue("name", "", exception.message.toString())
                }
                Mono.just("register")
            }
    }
}