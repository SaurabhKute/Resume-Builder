import mongoose from "mongoose";
import validator from "validator";

const linkSchema = mongoose.Schema(
  {
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
  },
  {
    _id: false,
  }
);

const personalInfoSchema = mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
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
        // Regular expression for validating phone numbers with optional spaces, dashes, or parentheses
        const phoneRegex = /^[+\d]?(?:[\d-.\s()]*)$/;

        // Remove all non-digit characters for length check
        const cleaned = value.replace(/\D/g, '');

        // Check if the cleaned value is 10 digits long
        if (cleaned.length !== 10) {
          throw new Error('Phone number must be exactly 10 digits');
        }

        // Check if the value matches the phone number pattern
        if (!phoneRegex.test(value)) {
          throw new Error('Invalid phone number format');
        }
      },
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },
    links: [linkSchema], // Array of link subdocuments
  },
  {
    timestamps: true,
  }
);

const PersonalInfo = mongoose.model('PersonalInfo', personalInfoSchema);

export default PersonalInfo;
