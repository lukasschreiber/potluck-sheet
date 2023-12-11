package com.lukasschreiber.potlucksheet.model.dto

// DTO for the overall error response
data class ErrorResponse(val message: String, val errors: List<FieldErrorDto>)