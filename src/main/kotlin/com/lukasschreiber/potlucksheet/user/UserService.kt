package com.lukasschreiber.potlucksheet.user

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono

@Service
class UserService(@Autowired val passwordEncoder: PasswordEncoder, val userRepository: UserRepository) {

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