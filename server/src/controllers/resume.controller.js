import httpStatus from 'http-status';
import resumeService from '../services/resume.service.js';
import mongoose from 'mongoose';
import User from '../models/user.model.js';
/**
 * Create a new resume
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 */



const createResume = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming the user ID is available in req.params

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(httpStatus.BAD_REQUEST).send({ message: 'Invalid user ID' });
    }
    const objectId = mongoose.Types.ObjectId.createFromHexString(userId);

    const user = await User.findById(objectId);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).send({ message: 'User not found' });
    }
    const resumeData = { ...req.body, userId };

    const resume = await resumeService.createResume(resumeData);

    res.status(httpStatus.CREATED).send({
      resumeId: resume._id, // Return the resume ID
      resume,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};


/**
 * Get all resume by userID
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 */

const getAllResumesByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const resumes = await resumeService.getAllResumeByuserId(userId);
    if (resumes?.length > 0) {
      res.status(httpStatus.OK).send(resumes);
    }
    else {
      res.status(httpStatus.OK).send({ message: "No resumes available" });
    }
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};


/**
 * Get a resume by ID
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 */

const getResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    // Check if the resumeId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(resumeId)) {
      return res.status(httpStatus.BAD_REQUEST).send({ message: 'Invalid resume ID' });
    }
    const objectId = mongoose.Types.ObjectId.createFromHexString(resumeId);

    const resume = await resumeService.getResumeById(objectId);

    if (!resume) {
      return res.status(httpStatus.NOT_FOUND).send({ message: 'Resume not found' });
    }

    res.send(resume);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

/**
 * Update a resume by ID
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 */
const updateResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const updateData = req.body;

    const resume = await resumeService.updateResumeById(resumeId, updateData);

    if (!resume) {
      return res.status(httpStatus.NOT_FOUND).send({ message: 'Resume not found' });
    }

    res.send(resume);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

/**
 * Delete a resume by ID
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 */
const deleteResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await resumeService.deleteResumeById(resumeId);

    if (!resume) {
      return res.status(httpStatus.NOT_FOUND).send({ message: 'Resume not found' });
    }

    res.status(httpStatus.OK).send({ message: "Deleted successfully" });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

export default {
  createResume,
  getAllResumesByUserId,
  getResumeById,
  updateResumeById,
  deleteResumeById,
};
