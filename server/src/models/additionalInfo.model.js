import mongoose from "mongoose";

const additionalInfoSchema = mongoose.Schema(
    {
        resumeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Resume',
            required: true,
        },
        awards: {
            type: [String],
            trim: true,
        },
    },
);

const AdditioanlInfo = mongoose.model('AdditioanlInfo', additionalInfoSchema);

export default AdditioanlInfo;
