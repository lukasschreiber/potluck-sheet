package com.lukasschreiber.potlucksheet.model.repo

import com.lukasschreiber.potlucksheet.model.User
import org.springframework.data.r2dbc.repository.R2dbcRepository
import reactor.core.publisher.Mono
import java.util.*

interface UserRepository : R2dbcRepository<User, UUID> {
    fun findByName(name: String): Mono<User>
    fun existsByName(name: String): Mono<Boolean>
}