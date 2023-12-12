package com.lukasschreiber.potlucksheet.services

import com.lukasschreiber.potlucksheet.model.User
import com.lukasschreiber.potlucksheet.model.dto.ConnectionTypes
import com.lukasschreiber.potlucksheet.model.dto.UserConnectionDto
import com.lukasschreiber.potlucksheet.model.dto.UserDto
import com.lukasschreiber.potlucksheet.model.repo.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.FluxSink
import reactor.core.publisher.Mono
import java.time.Duration

@Service
class UserService(@Autowired val passwordEncoder: PasswordEncoder, val userRepository: UserRepository) {
    private val activeUsers = mutableSetOf<UserDto>()
    private var userFluxSink: FluxSink<UserConnectionDto>? = null
    final val userFlux: Flux<UserConnectionDto> = Flux.create { sink ->
        userFluxSink = sink
    }.share()
    final val heartbeatFlux =  Flux.interval(Duration.ofSeconds(15))
        .map { UserConnectionDto(ConnectionTypes.HEARTBEAT, null) }


    fun getActiveUsers(): Set<UserConnectionDto> {
        if(activeUsers.size <= 0) return emptySet()
        return activeUsers.map { user -> UserConnectionDto(ConnectionTypes.CONNECTED, user) }.toSet()
    }

    fun addUser(user: UserDto) {
        activeUsers.add(user)
        userFluxSink?.next(UserConnectionDto(ConnectionTypes.CONNECTED, user))
    }

    fun removeUser(user: UserDto) {
        activeUsers.remove(user)
        userFluxSink?.next(UserConnectionDto(ConnectionTypes.DISCONNECTED, user))
    }

    fun registerUser(user: User): Mono<User> {
        return userRepository.existsByName(user.name).flatMap { exists ->
            if(exists) {
                return@flatMap Mono.error(UserExistsException("There is already an account registered with the same username"))
            }
            user.password = passwordEncoder.encode(user.password)
            return@flatMap userRepository.save(user)
        }
    }

    class UserExistsException(msg: String) : Exception(msg)
}