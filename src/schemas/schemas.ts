import joi from "joi"

export const signUpSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword:joi.string().required().valid(joi.ref('password'))
});

export const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export const testSchema = joi.object({
    name: joi.string().required(),
    pdfUrl: joi.string().uri().required(),
    categoryId: joi.number().required(),
    teacherDisciplineId: joi.number().required()
});