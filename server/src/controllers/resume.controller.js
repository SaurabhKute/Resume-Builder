import httpStatus from 'http-status';
import resumeService from '../services/resume.service.js';

/**
 * Create a new resume
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 */
const createResume = async (req, res) => {
  try {
    const resumeData = req.body;
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
    console.log(req.params.userId);
    const userId = req.params.userId;

    const resumes = await resumeService.getAllResumeByuserId(userId);
    res.status(httpStatus.OK).send(resumes);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};





/**
 * Get a resume by ID
 * @param {Object} req - HTTP request
 * @param {Object} res - HTTP response
 */

// const getResumeById = async (req, res) => {
//   try {
//     const { resumeId } = req.params;
//     const resume = await resumeService.getResumeById(resumeId);

//     if (!resume) {
//       return res.status(httpStatus.NOT_FOUND).send({ message: 'Resume not found' });
//     }

//     res.send(resume);
//   } catch (error) {
//     res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
//   }
// };

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

    res.status(httpStatus.OK).send({message: "Deleted successfully"});
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

export default {
  createResume,
  getAllResumesByUserId,
  updateResumeById,
  deleteResumeById,
};
