import { Router } from 'express';
import * as JobsController from '../controllers/Jobs.controller';
const router = new Router();

// Get all jobs
router.route('/company/:companyId/jobs').get(JobsController.getJobs);

// Get one job by ID
router.route('/company/:companyId/jobs/:jobId').get(JobsController.getJob);

// Create a new job
router.route('/company/:companyId/jobs').post(JobsController.createJob);

// Update a job
router.route('/company/:companyId/jobs/:jobId').put(JobsController.updateJob);

// Delete a job posting
router
  .route('/company/:companyId/jobs/:jobId')
  .delete(JobsController.deleteJob);

export default router;
