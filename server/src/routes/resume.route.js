import express from 'express';
import auth from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import resumeValidation from '../validations/resume.validation.js';
import resumeController from '../controllers/resume.controller.js';

const router = express.Router();

// Create a new resume
router.post('/', validate(resumeValidation.createResume), resumeController.createResume);

// Get a resume by ID
router.get('/:userId', resumeController.getAllResumesByUserId);

// Update a resume by ID
router.patch('/:resumeId', validate(resumeValidation.updateResume), resumeController.updateResumeById);

// Delete a resume by ID
router.delete('/:resumeId', resumeController.deleteResumeById);

export default router;
