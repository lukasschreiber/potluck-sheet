package com.lukasschreiber.potlucksheet

import io.r2dbc.spi.ConnectionFactory
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.core.io.ClassPathResource
import org.springframework.data.r2dbc.repository.config.EnableR2dbcRepositories
import org.springframework.r2dbc.connection.init.ConnectionFactoryInitializer
import org.springframework.r2dbc.connection.init.ResourceDatabasePopulator

@SpringBootApplication
class PotluckSheetApplication {
    @Bean("dbInitializer")
    fun initializer(connectionFactory: ConnectionFactory): ConnectionFactoryInitializer? {
        val initializer = ConnectionFactoryInitializer()
        initializer.setConnectionFactory(connectionFactory)
        initializer.setDatabasePopulator(
            ResourceDatabasePopulator(ClassPathResource("schema.sql"))
        )
        return initializer
    }
}

fun main(args: Array<String>) {
    runApplication<PotluckSheetApplication>(*args)
}
