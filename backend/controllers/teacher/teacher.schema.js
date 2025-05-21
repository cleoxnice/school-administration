const Joi = require("joi");
const { subjects } = require("../../utils/data");

const validatePhoneNumber = (value, helpers) => {
  const trimmedString = value?.replace(/\s/g, "");
  if (!/^[689]\d{7}$/.test(trimmedString)) {
    return helpers.error("any.invalid");
  }
  return trimmedString;
};

const postTeacherSchema = Joi.object({
  name: Joi.string().required(),
  subject: Joi.string()
    .valid(...subjects)
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  contactNumber: Joi.string()
    .custom(validatePhoneNumber, "Phone Number Validation")
    .required(),
});

module.exports = {
  postTeacherSchema,
};
