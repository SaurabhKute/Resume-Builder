import Resume from '../models/resume.model.js';

/**
 * Create a new resume
 * @param {Object} resumeData - Data for the new resume
 * @returns {Promise<Resume>}
 */
const createResume = async (resumeData) => {
  return Resume.create(resumeData);
};

/**
 * Get a resume by ID
 * @param {ObjectId} userId - ID of the user
 * @returns {Promise<Resume>}
 */
const getAllResumeByuserId = async (userId) => {
  return Resume.find({ userId },{_id:1, templateId:1, resumeTitle:1});
};


/**
 * Get a resume by ID
 * @param {ObjectId} resumeId - ID of the resume
 * @returns {Promise<Resume>}
 */
const getResumeById = async (resumeId) => {
  return Resume.findById(resumeId);
};



/**
 * Update a resume by ID
 * @param {ObjectId} resumeId - ID of the resume
 * @param {Object} updateData - Data to update
 * @returns {Promise<Resume>}
 */
const updateResumeById = async (resumeId, updateData) => {
  return Resume.findByIdAndUpdate(resumeId, updateData, { new: true });
};

/**
 * Delete a resume by ID
 * @param {ObjectId} resumeId - ID of the resume
 * @returns {Promise<Resume>}
 */
const deleteResumeById = async (resumeId) => {
  return Resume.findByIdAndDelete(resumeId);
};

export default {
  createResume,
  getAllResumeByuserId,
  getResumeById,
  updateResumeById,
  deleteResumeById,
};
