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

    fun updateTableEntry(update: PotluckTableEntry) {
        tableEntryRepository.saveIfNotPresent(update.value, update.userId!!, update.tableId!!).flatMap {entry ->
            userRepository.findById(entry.userId!!).mapNotNull {
                tableFluxSink?.next(TableEntrySyncDto(TableEntrySyncTypes.UPDATED, TableEntryWithUserDto(
                    user = it.toDto(),
                    uuid = entry.uuid!!,
                    tableId = entry.tableId!!,
                    value = entry.value
                )))
            }
        }.subscribe()
    }

    fun getTablesWithEntries(): Flux<TableWithEntriesDto> {
        return tableRepository.findAll().filter { it.active }.flatMap { table ->
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