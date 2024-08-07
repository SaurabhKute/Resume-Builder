import mongoose from "mongoose";

const projectInfoSchema = mongoose.Schema(
    {
        resumeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Resume',
            required: true,
        },
        projectName: {
            type: string,
            trim: true,
        },
        projectTechnology: {
            type: string,
            trim: true,
        },
        projectLink: {
            type: string,
            trim: true,
        },
        projectDescription: {
            type: string,
            trim: true,
        },
        location: {
            type: string,
            trim: true,
        },
        desciption: {
            type: string,
            trim: true,
        },
    },
);

const ProjectInfo = mongoose.model('ProjectInfo', projectInfoSchema);

export default ProjectInfo;
