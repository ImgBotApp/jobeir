import { Router } from 'express';
import * as JobController from '../controllers/Job.controller';
const router = new Router();

// Get all jobs
router.route('/jobs').get(JobController.getJobs);

// Get one job by ID
router.route('/jobs/:id').get(JobController.getJob);

// Create a new job
router.route('/jobs').post(JobController.createJob);

// Delete a job posting
router.route('/jobs/:id').delete(JobController.deleteJob);

export default router;
