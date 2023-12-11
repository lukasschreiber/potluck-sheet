package com.lukasschreiber.potlucksheet.config

import org.hibernate.validator.HibernateValidator
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean

@Configuration
class ValidatorConfig {
    @Bean
    fun validator(): LocalValidatorFactoryBean {
        val validatorFactoryBean = LocalValidatorFactoryBean()
        validatorFactoryBean.setProviderClass(HibernateValidator::class.java)
        return validatorFactoryBean
    }
}