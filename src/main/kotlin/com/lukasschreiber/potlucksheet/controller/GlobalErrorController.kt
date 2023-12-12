package com.lukasschreiber.potlucksheet.controller

import com.lukasschreiber.potlucksheet.model.dto.ErrorResponse
import com.lukasschreiber.potlucksheet.model.dto.FieldErrorDto
import com.lukasschreiber.potlucksheet.services.UserService
import jakarta.validation.ConstraintViolationException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.bind.support.WebExchangeBindException
import reactor.core.publisher.Mono


@RestControllerAdvice
class GlobalErrorController {
    @ExceptionHandler(WebExchangeBindException::class)
    fun handleException(ex: WebExchangeBindException): ResponseEntity<*> {
        val validationErrors = ex.bindingResult.fieldErrors.map { FieldErrorDto(it.field, it.defaultMessage) }
        val response = ErrorResponse("Validation failed", validationErrors)
        return ResponseEntity.badRequest()
            .body(response)
    }

    @ExceptionHandler(UserService.UserExistsException::class)
    fun handleUserExistsException(ex: UserService.UserExistsException): ResponseEntity<*> {
        val response = ErrorResponse("User exists", listOf(FieldErrorDto("name", "The user already exists.")))
        return ResponseEntity.badRequest().body(response)
    }


    @ExceptionHandler(BadCredentialsException::class)
    fun handleUserExistsException(ex: BadCredentialsException): ResponseEntity<*> {
        val response = ErrorResponse("Bad Credentials", listOf())
        return ResponseEntity(response, HttpStatus.UNAUTHORIZED)
    }
}