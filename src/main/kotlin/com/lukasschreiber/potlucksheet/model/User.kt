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
    @field:NotEmpty(message = "Der Name darf nicht leer sein.")
    @Column("name")
    var name: String = "",
    @field:NotEmpty(message = "Das Passwort darf nicht leer sein.")
    @field:Size(min = 4, message = "Das Passwort muss mindestens {min} Zeichen lang sein.")
    @Column var password: String = "",
) {
    fun toDto(): UserDto {
        return UserDto(uuid, name)
    }
}