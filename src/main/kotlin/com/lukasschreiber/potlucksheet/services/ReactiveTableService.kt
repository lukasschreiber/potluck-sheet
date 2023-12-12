package com.lukasschreiber.potlucksheet.services

import com.lukasschreiber.potlucksheet.model.PotluckTableEntry
import com.lukasschreiber.potlucksheet.model.dto.*
import com.lukasschreiber.potlucksheet.model.repo.TableEntryRepository
import com.lukasschreiber.potlucksheet.model.repo.TableRepository
import com.lukasschreiber.potlucksheet.model.repo.UserRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.FluxSink
import java.time.Duration

@Service
class ReactiveTableService(
    private val tableEntryRepository: TableEntryRepository,
    private val tableRepository: TableRepository,
    private val userRepository: UserRepository
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
        tableEntryRepository.saveIfNotPresent(update.value, update.userId!!, update.tableId!!).mapNotNull {
            tableFluxSink?.next(TableEntrySyncDto(TableEntrySyncTypes.UPDATED, it))
        }.subscribe()
    }

    fun getTablesWithEntries(): Flux<TableWithEntriesDto> {
        return tableRepository.findAll().flatMap { table ->
            tableEntryRepository.findByTableId(table.uuid!!)
                .flatMap { entry ->
                    userRepository.findById(entry.userId!!) // Assuming there's a userRepository for user information
                        .map { user ->
                            TableEntryWithUserDto(
                                uuid = entry.uuid!!,
                                tableId = table.uuid,
                                value = entry.value,
                                user = user.toDto()
                            )
                        }
                }
                .collectList()
                .map { entryWithUserList ->
                    TableWithEntriesDto(
                        uuid = table.uuid,
                        name = table.name,
                        description = table.description,
                        entries = entryWithUserList
                    )
                }
        }
    }
}