package com.lukasschreiber.potlucksheet.services

import com.lukasschreiber.potlucksheet.model.PotluckTableEntry
import com.lukasschreiber.potlucksheet.model.dto.*
import com.lukasschreiber.potlucksheet.model.repo.TableEntryRepository
import com.lukasschreiber.potlucksheet.model.repo.TableRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.FluxSink
import java.time.Duration

@Service
class ReactiveTableService(
    private val tableEntryRepository: TableEntryRepository,
    private val tableRepository: TableRepository
) {
    private var tableFluxSink: FluxSink<TableEntrySyncDto>? = null
    final val tableFlux: Flux<TableEntrySyncDto> = Flux.create { sink ->
        tableFluxSink = sink
    }.share()

    init {
        // Periodically send a heartbeat event to keep the connection alive
        val heartbeatFlux = Flux.interval(Duration.ofSeconds(5))
            .map { TableEntrySyncDto(TableEntrySyncTypes.HEARTBEAT, null) }

        tableFlux.mergeWith(heartbeatFlux)
            .onBackpressureDrop()
            .subscribe()
    }

    fun updateTableEntry(update: PotluckTableEntry) {
        tableEntryRepository.saveIfNotPresent(update.name, update.userId!!, update.tableId!!).mapNotNull {
            tableFluxSink?.next(TableEntrySyncDto(TableEntrySyncTypes.UPDATED, it))
        }.subscribe()
    }

    fun getTablesWithEntries(): Flux<TableWithEntriesDto> {
        return tableRepository.findAll().flatMap { table ->
            tableEntryRepository.findByTableId(table.uuid!!)
                .collectList()
                .map { entriesList ->
                    TableWithEntriesDto(
                        uuid = table.uuid,
                        name = table.name,
                        description = table.description,
                        entries = entriesList
                    )
                }
        }
    }
}