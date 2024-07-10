const Joi = require('joi');

exports.validateTransaction = (data) => {
  const schema = Joi.object({
    userId: Joi.number().integer().required(),
    amount: Joi.number().integer().required()
  });
  return schema.validate(data);
};
