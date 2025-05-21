const Joi = require("joi");
const { levels } = require("../../utils/data");

const postClassSchema = Joi.object({
  level: Joi.string()
    .valid(...levels)
    .required(),
  name: Joi.string().required(),
  teacherEmail: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

module.exports = {
  postClassSchema,
};
