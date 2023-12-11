package com.lukasschreiber.potlucksheet.controller

import com.lukasschreiber.potlucksheet.model.repo.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import java.time.Duration
import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneId
import java.time.format.DateTimeFormatter


@RestController
@RequestMapping("/api")
class UserController(@Autowired val userRepository: UserRepository) {

    @GetMapping(path = ["/stream"], produces = [MediaType.TEXT_EVENT_STREAM_VALUE])
    fun stream(): Flux<String> {
        val formatter = DateTimeFormatter.ofPattern("HH:mm:ss dd.MM.yyyy")
        return Flux.interval(Duration.ofSeconds(5))
            .map { value: Long -> value.toString() + ": " + LocalDateTime.ofInstant(Instant.ofEpochMilli(System.currentTimeMillis()), ZoneId.systemDefault()).format(formatter) }
    }
}