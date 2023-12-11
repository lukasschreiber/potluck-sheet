package com.lukasschreiber.potlucksheet.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table
import java.util.UUID

@Table(name = "tables")
data class PotluckTable(
    @Id
    val uuid: UUID? = null,
    @Column("name")
    var name: String = "",
    @Column("description")
    var description: String = "",
    @Column("active")
    var active: Boolean = true
)
