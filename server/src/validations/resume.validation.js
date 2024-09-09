import Joi from 'joi';

const linkSchema = Joi.object().keys({
  link: Joi.string().uri().required(),
  linkType: Joi.string().required(),
});

const personalInfoSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[+\d]?(?:[\d-.\s()]*)$/).required(),
  address: Joi.string().required(),
  jobTitle: Joi.string().required(),
  links: Joi.array().items(linkSchema),
});

const educationInfoSchema = Joi.object().keys({
  id:Joi.number(),
  institute: Joi.string(),
  location: Joi.string(),
  degreeType: Joi.string(),
  fieldOfStudy: Joi.string(),
  startMonthYear: Joi.string(),
  gradMonthYear: Joi.string(),
  score: Joi.string(),
  marks: Joi.string(),
});

const experienceInfoSchema = Joi.object().keys({
  employer: Joi.string(),
  jobTitle: Joi.string(),
  startMonthYear: Joi.string(),
  endMonthYear: Joi.string(),
  location: Joi.string(),
  description: Joi.string(),
});

const skillsetInfoSchema = Joi.object().keys({
  progLanguages: Joi.array().items(Joi.string()),
  frameworks: Joi.array().items(Joi.string()),
  tools: Joi.array().items(Joi.string()),
  databases: Joi.array().items(Joi.string()),
});

const projectInfoSchema = Joi.object().keys({
  projectName: Joi.string(),
  projectTechnology: Joi.string(),
  projectLink: Joi.string().uri(),
  projectDescription: Joi.string(),
  location: Joi.string(),
  description: Joi.string(),
});

const certificationInfoSchema = Joi.object().keys({
  certificates: Joi.array().items(Joi.string()),
});

const additionalInfoSchema = Joi.object().keys({
  awards: Joi.array().items(Joi.string()),
});

const createResume = {
  body: Joi.object().keys({
    resumeTitle: Joi.string().required(),
    userId: Joi.string().required(),
    templateId: Joi.string().required(),
    personalInfo: personalInfoSchema,
    educationInfo: Joi.array().items(educationInfoSchema),
    experienceInfo: Joi.array().items(experienceInfoSchema),
    skillsetInfo: skillsetInfoSchema,
    projectInfo: Joi.array().items(projectInfoSchema),
    certificationInfo: certificationInfoSchema,
    additionalInfo: additionalInfoSchema,
  }),
};

export default createResume;
