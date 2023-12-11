package com.lukasschreiber.potlucksheet.model.dto

import com.lukasschreiber.potlucksheet.model.PotluckTableEntry
import com.lukasschreiber.potlucksheet.model.User

data class TableEntryWithUserDto(
    val user: UserDto,
    val entry: PotluckTableEntry
) {
}