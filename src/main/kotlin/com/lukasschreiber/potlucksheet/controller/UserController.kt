package com.lukasschreiber.potlucksheet.controller

import com.lukasschreiber.potlucksheet.model.dto.UserConnectionDto
import com.lukasschreiber.potlucksheet.services.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.security.Principal
import java.time.Duration
import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneId
import java.time.format.DateTimeFormatter


@RestController
@RequestMapping("/api")
class UserController(@Autowired val userService: UserService) {

    @GetMapping(path = ["/stream"], produces = [MediaType.TEXT_EVENT_STREAM_VALUE])
    fun stream(): Flux<String> {
        val formatter = DateTimeFormatter.ofPattern("HH:mm:ss dd.MM.yyyy")
        return Flux.interval(Duration.ofSeconds(5))
            .map { value: Long ->
                "$value: " + LocalDateTime.ofInstant(
                    Instant.ofEpochMilli(System.currentTimeMillis()),
                    ZoneId.systemDefault()
                ).format(formatter)
            }
    }

    @GetMapping(path = ["/users"], produces = [MediaType.TEXT_EVENT_STREAM_VALUE])
    fun userStream(principal: Principal): Flux<UserConnectionDto> {
        val newUserFlux = userService.userFlux.doOnSubscribe {
            userService.userRepository.findByName(principal.name).subscribe {
                userService.addUser(it.toDto())
            }
        }
            .doOnCancel {
                userService.userRepository.findByName(principal.name).subscribe {
                    userService.removeUser(it.toDto())
                }
            }

        val allConnectedUsersFlux = Flux.fromIterable(userService.getActiveUsers())

        return Flux.merge(allConnectedUsersFlux, newUserFlux)
    }
}