import express from 'express';
import { validator} from '../middlewares/index.js';
import resumeController from '../controllers/resume.controller.js';
import resumeValidation from '../validations/resume.validation.js';

const router = express.Router();


// Create a new resume
router.post('/:userId', validator(resumeValidation.createResume), resumeController.createResume);

// Get all resume by userID
router.get('/:userId', resumeController.getAllResumesByUserId);

// Get a resume by ID
router.get('/:resumeId/1', resumeController.getResumeById);

// Update a resume by ID
router.patch('/:resumeId', validator(resumeValidation.updateResume), resumeController.updateResumeById);

// Delete a resume by ID
router.delete('/:resumeId', resumeController.deleteResumeById);

export default router;
