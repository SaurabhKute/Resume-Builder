import mongoose from "mongoose";

const skillsetInfoSchema = mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: true,
    },
    progLanguages: {
      type: [String],
      trim: true,
    },
    frameworks: {
      type: [String],
      trim: true,
    },
    tools: {
      type: [String],
      trim: true,
    },
    databases: {
      type: [String],
      trim: true,
    },
  },
);

const SkillsetInfo = mongoose.model('SkillsetInfo', skillsetInfoSchema);

export default SkillsetInfo;
