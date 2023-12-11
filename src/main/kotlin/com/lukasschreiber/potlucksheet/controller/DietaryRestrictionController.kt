package com.lukasschreiber.potlucksheet.controller

import com.lukasschreiber.potlucksheet.model.DietaryRestriction
import com.lukasschreiber.potlucksheet.model.repo.DietaryRestrictionRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/api")
class DietaryRestrictionController(
    @Autowired val dietaryRestrictionRepository: DietaryRestrictionRepository,
) {
    @GetMapping("/dietary-restrictions/relevant")
    fun findAllActiveAndNotNull(): ResponseEntity<List<DietaryRestriction>> {
        return ResponseEntity(dietaryRestrictionRepository.findAllActiveAndNotNull(), HttpStatus.OK)
    }

    @GetMapping("/dietary-restrictions")
    fun findAllActive(): ResponseEntity<List<DietaryRestriction>> {
        return ResponseEntity(dietaryRestrictionRepository.findAllActive(), HttpStatus.OK)
    }

    @PatchMapping("/dietary-restrictions")
    fun patch(@RequestBody patches: List<DietaryPatch>): ResponseEntity<Nothing> {
        patches.forEach { patch ->
            when (patch.action) {
                DietaryAction.ADD -> dietaryRestrictionRepository.incrementCount(patch.uuid).subscribe()
                DietaryAction.REMOVE -> dietaryRestrictionRepository.decrementCount(patch.uuid).subscribe()
            }
        }

        return ResponseEntity(HttpStatus.ACCEPTED)
    }

    enum class DietaryAction {
        REMOVE, ADD
    }
    data class DietaryPatch(val uuid: UUID, val action: DietaryAction)
}