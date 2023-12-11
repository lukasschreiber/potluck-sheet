package com.lukasschreiber.potlucksheet.model.dto

import com.lukasschreiber.potlucksheet.model.PotluckTableEntry
import reactor.core.publisher.Flux
import java.util.UUID

data class TableWithEntriesDto(
    val name: String,
    val description: String,
    val uuid: UUID,
    val entries: List<TableEntryWithUserDto>
)