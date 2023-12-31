package com.lukasschreiber.potlucksheet.config

import com.lukasschreiber.potlucksheet.model.repo.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.ReactiveAuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.core.Authentication
import org.springframework.security.core.userdetails.ReactiveUserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.server.SecurityWebFilterChain
import reactor.core.publisher.Mono


@Configuration
@EnableWebFluxSecurity
class WebSecurityConfig(@Autowired val userRepository: UserRepository) {
    @Bean
    fun securityFilterChain(http: ServerHttpSecurity): SecurityWebFilterChain {
        return http
            .authorizeExchange { exchanges ->
                exchanges
                    .pathMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                    .pathMatchers("/api/auth/**").permitAll()
                    .pathMatchers("/api/config").permitAll()
                    .pathMatchers("/api/**").authenticated()
                    .anyExchange().permitAll()
            }
            .csrf { csrf ->
                csrf.disable()
            }
            .httpBasic(Customizer.withDefaults())
            .logout { logout ->
                logout
                    .logoutUrl("/api/logout")
                    .logoutSuccessHandler { exchange, _ ->
                        Mono.fromRunnable {
                            exchange.exchange.response.statusCode = HttpStatus.OK
                        }
                    }
            }
            .build()
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

    @Bean
    fun authManager(): ReactiveAuthenticationManager {
        return ReactiveAuthenticationManager { authentication ->
            val username = authentication.name
            val password = authentication.credentials.toString()

            userDetailsService().findByUsername(username)
                .handle<Authentication> { user, sink ->
                    if (passwordEncoder().matches(password, user.password)) {
                        sink.next(UsernamePasswordAuthenticationToken(user, null, user.authorities))
                    } else {
                        sink.error(BadCredentialsException("Bad Credentials"))
                    }
                }
        }
    }

    @Bean
    fun userDetailsService(): ReactiveUserDetailsService {
        return ReactiveUserDetailsService { username ->
            userRepository.findByName(username)
                .map { user ->
                    org.springframework.security.core.userdetails.User.builder()
                        .username(user.name)
                        .password(user.password)
                        .roles("USER")
                        .build()
                }
                .switchIfEmpty(Mono.error { IllegalArgumentException("User not found with username: $username") })
        }
    }
}