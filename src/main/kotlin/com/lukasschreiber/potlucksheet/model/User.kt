package com.lukasschreiber.potlucksheet.model

import com.lukasschreiber.potlucksheet.model.dto.UserDto
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.Size
import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table
import java.util.*

@Table(name = "users")
data class User(
    @Id
    var uuid: UUID? = null,
    @field:NotEmpty(message = "Name should not be empty.")
    @Column("name")
    var name: String = "",
    @field:NotEmpty
    @field:Size(min = 4, message = "Password must be at least {min} characters long")
    @Column var password: String = "",
) {
    fun toDto(): UserDto {
        return UserDto(uuid, name)
    }
}