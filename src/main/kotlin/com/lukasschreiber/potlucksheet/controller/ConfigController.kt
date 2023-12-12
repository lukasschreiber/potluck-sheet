package com.lukasschreiber.potlucksheet.controller

import com.lukasschreiber.potlucksheet.model.dto.ConfigDto
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/api")
class ConfigController {
    @Value("\${app.potluck-sheet.version}")
    private lateinit var appVersion: String

    @Value("\${app.potluck-sheet.build-year}")
    private lateinit var buildYear: String

    @GetMapping("/config")
    fun getConfig(): ResponseEntity<ConfigDto> {
       return ResponseEntity.ok(
           ConfigDto(
           version = appVersion,
           buildYear = buildYear
       )
       )
    }
}