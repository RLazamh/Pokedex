import * as Joi from 'joi'

export const JoiValidate = Joi.object({
    MONGODB : Joi.required(),
    PORT : Joi.required().default(3002),
    DEFAULT_LIMIT : Joi.number().default(6),
}) 