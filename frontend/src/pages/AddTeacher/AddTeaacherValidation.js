import Joi from "joi";
import { subjects } from "../../constants/data";

const validatePhoneNumber = (value, helpers) => {
  const trimmedString = value?.replace(/\s/g, "");
  if (!/^[689]\d{7}$/.test(trimmedString)) {
    return helpers.error("any.invalid");
  }
  return trimmedString;
};

// Joi Validation Schema
const teacherSchema = Joi.object({
  name: Joi.string().max(150).required().messages({
    "string.empty": "Name is required.",
    "string.max": "Name should not exceed {#limit} characters.",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required.",
      "string.email": "This email address is invalid.",
    }),
  contactNumber: Joi.string()
    .custom(validatePhoneNumber, "Phone Number Validation.")
    .required()
    .messages({
      "string.empty": "Contact number is required.",
      "any.invalid": "This work contact number is invalid.",
    }),
  subject: Joi.string()
    .valid(...subjects)
    .required()
    .messages({
      "string.empty": "Subject is required.",
      "any.only": "Please select a subject from the dropdown list.",
    }),
});

export default teacherSchema;
