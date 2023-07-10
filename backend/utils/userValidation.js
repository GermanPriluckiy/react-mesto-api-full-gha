/* eslint-disable no-useless-escape */
const { celebrate, Joi } = require('celebrate');

const joiUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const joiUserIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

const joiUserAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .regex(
        /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/,
      ),
  }),
});

module.exports = {
  joiUserValidation,
  joiUserIdValidation,
  joiUserAvatarValidation,
};
