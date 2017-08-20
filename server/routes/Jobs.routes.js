import { Router } from 'express';
import * as JobsController from '../controllers/Jobs.controller';
import { catchErrors } from '../errors/handleErrors';

const router = new Router();

// Get all jobs
router
  .route('/company/:companyId/jobs')
  .get(catchErrors(JobsController.getJobs));

// Get one job by ID
router
  .route('/company/:companyId/jobs/:jobId')
  .get(catchErrors(JobsController.getJob));

// Get one job by ID
router.route('/jobs/:jobId').get(catchErrors(JobsController.getJob));

// Create a new job
router
  .route('/company/:companyId/jobs')
  .post(catchErrors(JobsController.createJob));

// Update a job
router
  .route('/company/:companyId/jobs/:jobId')
  .put(catchErrors(JobsController.updateJob));

// Delete a job posting
router
  .route('/company/:companyId/jobs/:jobId')
  .delete(catchErrors(JobsController.deleteJob));

export default router;
