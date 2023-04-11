import { Joi } from "express-validation";

// register schema for users
export const reg_schema = {
  body: Joi.object({
    username: Joi.string().alphanum().min(1).max(10).required(),

    password: Joi.string()
      .pattern(/^[\S]{5,12}$/)
      .required(),

    email: Joi.string().email().required(),
  }),
};

export const login_schema = {
  body: Joi.object({
    username: Joi.string().alphanum().min(1).max(10).required(),

    password: Joi.string()
      .pattern(/^[\S]{5,12}$/)
      .required(),
  }),
}
