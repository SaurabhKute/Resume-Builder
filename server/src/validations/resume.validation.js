import Joi from 'joi';

const createResume = {
  body: Joi.object().keys({
    resumeTitle: Joi.string().required(),
    userId: Joi.string().required(),
    templateId: Joi.string().required(),
  }),
};


export default {
  createResume,
};
