// import Joi from "joi";

// export const signupValidation = (req, res, next) => {
//     const schema = Joi.object({
//         name: Joi.string().min(3).max(100).required(),
//         email: Joi.string().email().required(),
//         password: Joi.string().min(8).max(100).required()
//     })
//     const { error } = schema.validate(req.body);
//     if (error) {
//         return res.status(400).json({
//             message: 'bad request', error
//         })
//     }
//     next();
// }


// export const loginValidation = (req, res, next) => {
//     const schema = Joi.object({
//         email: Joi.string().email().required(),
//         password: Joi.string().min(8).max(100).required()
//     })
//     const { error } = schema.validate(req.body);
//     if (error) {
//         return res.status(400).json({
//             message: 'bad request', error
//         })
//     }
//     next();
// }

import Joi from 'joi';

// 📝 Common reusable email schema
const emailSchema = Joi.string().email().required().messages({
    'string.empty': 'Email cannot be empty',
    'string.email': 'Invalid email format',
    'any.required': 'Email is required'
});

// 📝 Common reusable password schema
const passwordSchema = Joi.string().min(8).max(100).required().messages({
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password must be at least 8 characters long',
    'any.required': 'Password is required'
});

// ✅ Signup Validation
export const signupValidation = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Request body cannot be empty' });
    }

    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required().messages({
            'string.empty': 'Name cannot be empty',
            'string.min': 'Name must be at least 3 characters long',
            'any.required': 'Name is required'
        }),
        email: emailSchema,
        password: passwordSchema
    }).required();

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            message: 'Validation error',
            errors: error.details.map(err => err.message)
        });
    }

    next();
};

// ✅ Login Validation
export const loginValidation = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Request body cannot be empty' });
    }

    const schema = Joi.object({
        email: emailSchema,
        password: passwordSchema
    }).required();

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            message: 'Validation error',
            errors: error.details.map(err => err.message)
        });
    }

    next();
};
