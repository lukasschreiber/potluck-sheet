package com.lukasschreiber.potlucksheet.model.repo

import com.lukasschreiber.potlucksheet.model.PotluckTable
import com.lukasschreiber.potlucksheet.model.PotluckTableEntry
import org.springframework.data.r2dbc.repository.Modifying
import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.r2dbc.repository.R2dbcRepository
import org.springframework.data.repository.query.Param
import org.springframework.transaction.annotation.Transactional
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.*

interface TableEntryRepository : R2dbcRepository<PotluckTableEntry, UUID> {

    @Transactional
    @Query(value = "INSERT INTO entries (uuid, value, user_id, table_id) VALUES (gen_random_uuid(), :value, :user_id, :table_id) ON CONFLICT (user_id,table_id) DO UPDATE SET value = EXCLUDED.value RETURNING *")
    fun saveIfNotPresent(
        @Param("value") value: String,
        @Param("user_id") userId: UUID,
        @Param("table_id") tableId: UUID
    ): Mono<PotluckTableEntry>

    fun findByTableId(tableId: UUID): Flux<PotluckTableEntry>
}