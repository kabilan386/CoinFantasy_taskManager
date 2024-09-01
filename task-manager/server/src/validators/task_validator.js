const { body, validationResult } = require("express-validator");

const userValidationRules = () => {
    return [
        // email must be an email
        body('title').trim().notEmpty()
            .withMessage('Invalid title format'),    
        // description must be at least 8 chars long 
        body('description').trim().notEmpty()
            .withMessage('Invalid description format'),
        // duedate must be at least 8 chars long 
        body('dueDate').trim().notEmpty().isDate({format: "YYYY-MM-DD"})
            .withMessage('Invalid dueDate format'),  
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    userValidationRules,
    validate,
}