package com.lukasschreiber.potlucksheet.model.repo

import com.lukasschreiber.potlucksheet.model.PotluckTable
import org.springframework.data.r2dbc.repository.Modifying
import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.r2dbc.repository.R2dbcRepository
import org.springframework.data.repository.query.Param
import org.springframework.transaction.annotation.Transactional
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.*

interface TableRepository: R2dbcRepository<PotluckTable, UUID> {
    @Query("SELECT * FROM tables t LEFT JOIN entries e ON t.uuid = e.table_id WHERE t.uuid = :tableId")
    fun findTableWithEntriesById(tableId: UUID): Flux<PotluckTable>

    @Modifying
    @Transactional
    @Query(value = "UPDATE tables SET active = false WHERE name NOT IN (:entities)")
    fun deactivateNotInConfig(@Param("entities") entities: List<String>): Mono<Unit>

    @Modifying
    @Transactional
    @Query(value = "UPDATE tables SET active = true WHERE name IN (:entities) AND active = false")
    fun activateInConfig(@Param("entities") entities: List<String>): Mono<Unit>

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO tables (uuid, name, description) VALUES (gen_random_uuid(), :label, :description) ON CONFLICT (name) DO UPDATE SET description = :description")
    fun saveIfNameDoesNotExist(@Param("name") name: String, @Param("description") description: String): Mono<Unit>
}