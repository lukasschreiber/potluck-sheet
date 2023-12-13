package com.lukasschreiber.potlucksheet

import org.springframework.context.annotation.Bean
import org.springframework.core.io.ClassPathResource
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.server.RouterFunctions
import org.springframework.web.reactive.function.server.RouterFunctions.resources
import reactor.core.publisher.Mono

@Component
class Client {
    @Bean
    fun webClient() = resources { request ->
        val path = request.uri().path
        if (path.startsWith("/api")) {
            Mono.empty()
        } else {
            resourceLookup.apply(request)
        }
    }

    private val resourceLookup = RouterFunctions
        .resourceLookupFunction("/**", ClassPathResource("static/"))
        .andThen {
            it.switchIfEmpty(Mono.just(ClassPathResource("static/index.html")))
        }
}