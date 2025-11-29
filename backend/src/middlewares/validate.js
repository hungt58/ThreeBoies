import Joi from "joi";

// Middleware validate Joi chung
const validateJoi = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ 
      errors: error.details.map(e => ({ message: e.message, path: e.path })) 
    });
  }
  next();
};

export default validateJoi;
