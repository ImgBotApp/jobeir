import { Router } from 'express';
import * as JobController from '../controllers/Job.controller';
const router = new Router();

// Get all jobs
router.route('/company/:companyId/jobs').get(JobController.getJobs);

// Get one job by ID
router.route('/company/:companyId/jobs/:jobId').get(JobController.getJob);

// Create a new job
router.route('/company/:companyId/jobs').post(JobController.createJob);

// Update a job
router.route('/company/:companyId/jobs/:jobId').put(JobController.updateJob);

// Delete a job posting
router.route('/company/:companyId/jobs/:jobId').delete(JobController.deleteJob);

export default router;
