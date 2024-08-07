import mongoose from "mongoose";

const certificationInfoSchema = mongoose.Schema(
    {
        resumeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Resume',
            required: true,
        },
        certificates: {
            type: [String],
            trim: true,
        },
    },
);

const CertificateInfo = mongoose.model('CertificateInfo', certificationInfoSchema);

export default CertificateInfo;
