import mongoose from "mongoose";

const educationInfoSchema = mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: true,
    },
    institute: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    degreeType: {
      type: String,
      trim: true,
    },
    fieldOfStudy: {
      type: String,
      trim: true,
    },
    startMonthYear: {
      type: String,
      trim: true,
    },
    gradMonthYear: {
      type: String,
      trim: true,
    },
    score: {
      type: String,
      trim: true,
    },
    marks: {
      type: String,
      trim: true,
    },


  },
  {
    timestamps: true,
  }
);

const EducationInfo = mongoose.model('EducationInfo', educationInfoSchema);

export default EducationInfo;
