package com.lukasschreiber.potlucksheet.model.dto

import com.lukasschreiber.potlucksheet.model.PotluckTableEntry
import com.lukasschreiber.potlucksheet.model.User
import java.util.UUID

data class TableEntryWithUserDto(
    val user: UserDto,
    val uuid: UUID,
    val value: String,
    val tableId: UUID
)