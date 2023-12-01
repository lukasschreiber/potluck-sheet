package com.lukasschreiber.potlucksheet.dietary_restrictions

import java.util.*
import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table

@Table(
    name = "dietaryrestrictions",
//    uniqueConstraints = [UniqueConstraint(columnNames = ["label"])]
)
data class DietaryRestriction(
    @Id
    val uuid: UUID = UUID.randomUUID(),
    @Column("label")
    var label: String = "",
    @Column("color")
    var color: String = "",
    @Column("count")
    var count: Int = 0,
    @Column("active")
    var active: Boolean = true
)