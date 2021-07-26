const Joi = require("joi");

const checkValidation = (schema, req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.message });
  }
  next();
};

// const validationuserData = (req, res, next) => {
const userRegistrationValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    login: Joi.string().min(6).max(14).required(),
    password: Joi.string()
      .min(6)
      .max(14)
      //   .pattern(new RegExp("^[a-zA-Z0-9]{6,20}$")) // РАЗОБРАТЬ ЭТО!
      .required(),
    userInfo: {
      // тут какая проверка???
      height: Joi.string.min(2).max(3).required(),
      weight: Joi.string.min(2).max(3).required(),
      age: Joi.string.min(2).max(3).required(),
      desiredWeight: Joi.string.min(2).max(3).required(),
      bloodGroup: Joi.string.min(1).max(1).required(),
    },
  });
  checkValidation(schema, req, res, next);
};

const userLoginValidation = (req, res, next) => {
  const schema = Joi.object({
    login: Joi.string().min(6).max(14),
    password: Joi.string().min(6).max(14).required(),
  });
  checkValidation(schema, req, res, next);
};

module.exports = {
  userRegistrationValidation,
  userLoginValidation,
};
