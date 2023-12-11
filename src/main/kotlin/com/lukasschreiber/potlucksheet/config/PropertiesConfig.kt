package com.lukasschreiber.potlucksheet.config

import com.lukasschreiber.potlucksheet.model.repo.DietaryRestrictionRepository
import com.lukasschreiber.potlucksheet.model.repo.TableRepository
import jakarta.annotation.PostConstruct
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.DependsOn
import org.springframework.stereotype.Component

@Component
@DependsOn("dbInitializer")
@ConfigurationProperties("app.potluck-sheet")
class PropertiesConfig {
    /**
     * A list of all dietary restrictions
     */
    @SuppressWarnings("WeakerAccess")
    final var dietaryRestrictions: List<DietaryRestrictionConfigEntry> = ArrayList()

    @SuppressWarnings("WeakerAccess")
    final var tables: List<TableConfigEntry> = ArrayList()

    @Autowired
    private lateinit var dietaryRestrictionRepository: DietaryRestrictionRepository

    @Autowired lateinit var tableRepository: TableRepository

    @PostConstruct
    fun init() {
        for (dietaryRestriction in dietaryRestrictions) {
            dietaryRestrictionRepository.saveIfLabelNotExists(dietaryRestriction.name, dietaryRestriction.color)
                .doOnError { error -> println("Error saving dietary restriction: ${dietaryRestriction.name}, ${dietaryRestriction.color}, error: $error") }
                .subscribe()
        }

        dietaryRestrictionRepository.activateInConfig(dietaryRestrictions.map { it.name })
            .doOnError { error -> println("Error activating dietary restrictions, error: $error") }
            .subscribe()

        dietaryRestrictionRepository.deactivateNotInConfig(dietaryRestrictions.map { it.name })
            .doOnError { error -> println("Error deactivating dietary restrictions, error: $error") }
            .subscribe()

        for (table in tables) {
            tableRepository.saveIfNameDoesNotExist(table.name, table.description)
                .doOnError { error -> println("Error saving table: ${table.name}, ${table.description}, error: $error") }
                .subscribe()
        }

        tableRepository.activateInConfig(tables.map { it.name })
            .doOnError { error -> println("Error activating table, error: $error") }
            .subscribe()

        tableRepository.deactivateNotInConfig(tables.map { it.name })
            .doOnError { error -> println("Error deactivating table, error: $error") }
            .subscribe()
    }

    data class DietaryRestrictionConfigEntry(val name: String, val color: String)
    data class TableConfigEntry(val name: String, val description: String)

}