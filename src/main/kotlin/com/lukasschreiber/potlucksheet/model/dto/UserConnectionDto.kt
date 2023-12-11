package com.lukasschreiber.potlucksheet.model.dto

data class UserConnectionDto(
    val type: ConnectionTypes,
    val user: UserDto?
)

