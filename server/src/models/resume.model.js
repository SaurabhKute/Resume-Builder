import mongoose from 'mongoose';
import validator from 'validator';

// Define subdocument schemas
const linkSchema = mongoose.Schema({
  link: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error('Invalid URL');
      }
    },
  },
  linkType: {
    type: String,
    required: true,
    trim: true,
  },
}, { _id: false });

const personalInfoSchema = mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email');
      }
    },
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      const phoneRegex = /^[+\d]?(?:[\d-.\s()]*)$/;
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length !== 10 || !phoneRegex.test(value)) {
        throw new Error('Invalid phone number format');
      }
    },
  },
  address: { type: String, required: true, trim: true },
  jobTitle: { type: String, required: true, trim: true },
  links: [linkSchema],
}, { _id: false });

const educationInfoSchema = mongoose.Schema({
  institute: { type: String, trim: true },
  location: { type: String, trim: true },
  degreeType: { type: String, trim: true },
  fieldOfStudy: { type: String, trim: true },
  startMonthYear: { type: String, trim: true },
  gradMonthYear: { type: String, trim: true },
  score: { type: String, trim: true },
  marks: { type: String, trim: true },
}, { _id: false });

const experienceInfoSchema = mongoose.Schema({
  employer: { type: String, trim: true },
  jobTitle: { type: String, trim: true },
  startMonthYear: { type: String, trim: true },
  endMonthYear: { type: String, trim: true },
  location: { type: String, trim: true },
  description: { type: String, trim: true },
}, { _id: false });

const skillsetInfoSchema = mongoose.Schema({
  progLanguages: { type: [String], trim: true },
  frameworks: { type: [String], trim: true },
  tools: { type: [String], trim: true },
  databases: { type: [String], trim: true },
}, { _id: false });

const projectInfoSchema = mongoose.Schema({
  projectName: { type: String, trim: true },
  projectTechnology: { type: String, trim: true },
  projectLink: { type: String, trim: true },
  projectDescription: { type: String, trim: true },
  location: { type: String, trim: true },
  description: { type: String, trim: true },
}, { _id: false });

const certificationInfoSchema = mongoose.Schema({
  certificates: { type: [String], trim: true },
}, { _id: false });

const additionalInfoSchema = mongoose.Schema({
  awards: { type: [String], trim: true },
}, { _id: false });

// Define main resume schema
const resumeSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  templateId: {
    type: Number,
  },
  resumeTitle: {
    type: String,
    required: true,
  },
  personalInfo: personalInfoSchema,
  educationInfo: [educationInfoSchema],
  experienceInfo: [experienceInfoSchema],
  skillsetInfo: skillsetInfoSchema,
  projectInfo: [projectInfoSchema],
  certificationInfo: certificationInfoSchema,
  additionalInfo: additionalInfoSchema,
}, { timestamps: true });

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
