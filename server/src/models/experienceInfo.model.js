import mongoose from "mongoose";

const experienceInfoSchema = mongoose.Schema(
    {
        resumeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resume",
            required: true,
        },
        employer: {
            type: String,
            trim: true,
        },
        jobTitle: {
            type: String,
            trim: true,
        },
        startMonthYear: {
            type: String,
            trim: true,
        },
        endMonYear: {
            type: String,
            trim: true,
        },
        location: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const ExperienceInfo = mongoose.model("ExperienceInfo", experienceInfoSchema);

export default ExperienceInfo;
