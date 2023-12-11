package com.lukasschreiber.potlucksheet.model.repo

import com.lukasschreiber.potlucksheet.model.DietaryRestriction
import org.springframework.data.r2dbc.repository.Modifying
import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.r2dbc.repository.R2dbcRepository
import org.springframework.data.repository.query.Param
import org.springframework.transaction.annotation.Transactional
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.*

interface DietaryRestrictionRepository : R2dbcRepository<DietaryRestriction, UUID> {

    @Modifying
    @Transactional
    @Query(value = "UPDATE dietaryrestrictions SET active = false WHERE label NOT IN (:entities)")
    fun deactivateNotInConfig(@Param("entities") entities: List<String>): Mono<Unit>

    @Modifying
    @Transactional
    @Query(value = "UPDATE dietaryrestrictions SET active = true WHERE label IN (:entities) AND active = false")
    fun activateInConfig(@Param("entities") entities: List<String>): Mono<Unit>

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO dietaryrestrictions (uuid, label, color) VALUES (gen_random_uuid(), :label, :color) ON CONFLICT (label) DO UPDATE SET color = :color")
    fun saveIfLabelNotExists(@Param("label") label: String, @Param("color") color: String): Mono<Unit>

    @Query(value = "SELECT * FROM dietaryrestrictions WHERE active = true AND count > 0 ORDER BY count DESC")
    fun findAllActiveAndNotNull(): Flux<DietaryRestriction>

    @Query(value = "SELECT * FROM dietaryrestrictions WHERE active = true")
    fun findAllActive(): Flux<DietaryRestriction>

    @Modifying
    @Transactional
    @Query(value = "UPDATE dietaryrestrictions SET count = count + 1 WHERE uuid = :uuid")
    fun incrementCount(@Param("uuid") uuid: UUID): Mono<Unit>

    @Modifying
    @Transactional
    @Query(value = "UPDATE dietaryrestrictions SET count = count - 1 WHERE uuid = :uuid AND count > 0")
    fun decrementCount(@Param("uuid") uuid: UUID): Mono<Unit>
}