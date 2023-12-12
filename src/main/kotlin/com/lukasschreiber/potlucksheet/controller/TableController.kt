package com.lukasschreiber.potlucksheet.controller

import com.lukasschreiber.potlucksheet.model.PotluckTable
import com.lukasschreiber.potlucksheet.model.PotluckTableEntry
import com.lukasschreiber.potlucksheet.model.dto.TableEntryCreationDto
import com.lukasschreiber.potlucksheet.model.dto.TableEntrySyncDto
import com.lukasschreiber.potlucksheet.model.dto.TableWithEntriesDto
import com.lukasschreiber.potlucksheet.model.dto.UserConnectionDto
import com.lukasschreiber.potlucksheet.services.ReactiveTableService
import com.lukasschreiber.potlucksheet.services.UserService
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.security.Principal

@RestController
@RequestMapping("/api")
class TableController(val tableService: ReactiveTableService, val userService: UserService) {
    @GetMapping(path = ["/tables/entries"], produces = [MediaType.TEXT_EVENT_STREAM_VALUE])
    fun tableEntryStream(principal: Principal): Flux<TableEntrySyncDto> {
        return tableService.tableFlux
    }

    @GetMapping("/tables")
    fun tables(): Flux<TableWithEntriesDto> {
        return tableService.getTablesWithEntries()
    }

    @PostMapping("/tables/entry")
    fun createEntry(principal: Principal, @RequestBody tableEntry: TableEntryCreationDto): Mono<ResponseEntity<Any>> {
        return userService.userRepository.findByName(principal.name).flatMap {user ->
            tableService.updateTableEntry(
                PotluckTableEntry(
                    tableId = tableEntry.tableId,
                    value = tableEntry.value,
                    userId = user.uuid
                )
            )

            Mono.just(ResponseEntity.accepted().body(null))
        }
    }
}