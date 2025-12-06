// blogValidator.js
import Joi from "joi";

 
// Validator getAllBlogs (pagination)
export const getAllBlogsSchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  pageSize: Joi.number().integer().min(1).optional(),
  topic: Joi.string().trim().optional()
});
