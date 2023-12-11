package com.lukasschreiber.potlucksheet.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table
import java.util.*

@Table(name="entries")
data class PotluckTableEntry(
    @Id
    var uuid: UUID? = null,
    @Column("name")
    var name: String = "",
    @Column("table_id")
    var tableId: UUID? = null,
    @Column("user_id")
    var userId: UUID? = null
)
