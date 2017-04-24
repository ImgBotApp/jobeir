import { Router } from 'express';
import * as JobController from '../controllers/Job.controller';
const router = new Router();

// Get all companies
router.route('/jobs').get(JobController.getJobs);

// Get one job by ID
router.route('/jobs/:id').get(JobController.getJob);

// Add a new company
router.route('/jobs').post(JobController.createJob);

// Delete a post by company
router.route('/jobs/:id').delete(JobController.deleteJob);

export default router;
