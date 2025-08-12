import joi from 'joi';

export const productValidation = joi.object({
  name: joi.string().required().messages({
    "string.base": "O nome deve ser um texto",
    "string.empty": "O nome é obrigatório",
    "string.min": "O nome deve ter pelo menos 3 caracteres",
    "any.required": "O nome é obrigatório"
  }),
  title: joi.string().required().messages({
    "string.base": "O título deve ser um texto",
    "string.empty": "O título é obrigatório",
    "any.required": "O título é obrigatório"
  }),
    description: joi.string().required().messages({
    "string.base": "A descrição deve ser um texto",
    "string.empty": "A descrição é obrigatória",
    "any.required": "A descrição é obrigatória"
  }),
  price: joi.number().positive().required().messages({
    "number.base": "O preço deve ser um número",
    "number.positive": "O preço deve ser um valor positivo",
    "any.required": "O preço é obrigatório"
  }),
})