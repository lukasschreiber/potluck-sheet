package com.lukasschreiber.potlucksheet.model.dto

import java.util.UUID

data class TableEntryCreationDto(
    val tableId: UUID,
    val value: String
)