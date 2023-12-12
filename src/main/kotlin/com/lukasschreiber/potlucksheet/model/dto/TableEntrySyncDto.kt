package com.lukasschreiber.potlucksheet.model.dto

import com.lukasschreiber.potlucksheet.model.PotluckTableEntry

data class TableEntrySyncDto(
    val type: TableEntrySyncTypes,
    val tableEntry: TableEntryWithUserDto?
)

enum class TableEntrySyncTypes {
    UPDATED, HEARTBEAT
}