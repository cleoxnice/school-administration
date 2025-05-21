import Joi from "joi";
import { levels } from "../../constants/data";

// Joi Validation Schema
const classSchema = Joi.object({
  level: Joi.string()
    .valid(...levels)
    .required()
    .messages({
      "string.empty": "Class level is required.",
      "any.only": "Please select a class level from the dropdown list.",
    }),
  name: Joi.string().max(150).required().messages({
    "string.empty": "Class name is required.",
    "string.max": "Name should not exceed {#limit} characters.",
  }),
  teacherEmail: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Form teacher is required.",
      "string.email": "Please select a teacher from the dropdown list.",
    }),
});

export default classSchema;
