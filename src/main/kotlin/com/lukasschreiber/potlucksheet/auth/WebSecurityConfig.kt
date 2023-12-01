package com.lukasschreiber.potlucksheet.auth

import com.lukasschreiber.potlucksheet.user.User
import com.lukasschreiber.potlucksheet.user.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpStatus
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.ReactiveAuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.core.Authentication
import org.springframework.security.core.userdetails.ReactiveUserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.server.SecurityWebFilterChain
import org.springframework.security.web.server.authentication.RedirectServerAuthenticationSuccessHandler
import org.springframework.security.web.server.csrf.CookieServerCsrfTokenRepository
import reactor.core.publisher.Mono
import java.net.URI
import java.util.*
import javax.sql.DataSource


@Configuration
@EnableWebFluxSecurity
class WebSecurityConfig(@Autowired val userRepository: UserRepository) {
    @Bean
    fun securityFilterChain(http: ServerHttpSecurity): SecurityWebFilterChain {
        return http
            .authorizeExchange { exchanges ->
                exchanges
                    .pathMatchers("/login", "/register/**", "/css/**").permitAll()
                    .pathMatchers("/**").authenticated()
            }.csrf { csrf ->
                csrf.csrfTokenRepository(CookieServerCsrfTokenRepository.withHttpOnlyFalse())
            }
            .formLogin { login ->
                login
                    .loginPage("/login")
                    .authenticationSuccessHandler(RedirectServerAuthenticationSuccessHandler("/"))
            }.logout { logout ->
                logout
                    .logoutUrl("/logout")
                    .logoutSuccessHandler { exchange, _ ->
                        Mono.fromRunnable {
                            exchange.exchange.response.statusCode = HttpStatus.SEE_OTHER
                            exchange.exchange.response.headers.location = URI.create("/login?logout")
                        }
                    }
            }.build()
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

    @Bean
    @Throws(Exception::class)
    fun authManager(): ReactiveAuthenticationManager {
        return ReactiveAuthenticationManager { authentication ->
            val username = authentication.name
            val password = authentication.credentials.toString()

            userDetailsService().findByUsername(username)
                .handle<Authentication> { user, sink ->
                    if (passwordEncoder().matches(password, user.password)) {
                        sink.next(UsernamePasswordAuthenticationToken(user, null, user.authorities))
                    } else {
                        sink.error(IllegalArgumentException("Bad credentials"))
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