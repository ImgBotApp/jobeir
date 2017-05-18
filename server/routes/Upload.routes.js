import { Router } from 'express';
import * as Uploader from '../controllers/Upload.controller';
const router = new Router();

// // Get all jobs
// router.route('/jobs').get(JobController.getJobs);

// // Get one job by ID
// router.route('/jobs/:id').get(JobController.getJob);

// Upload a new image

router
  .route('/upload')
  .all(Uploader.upload, Uploader.resize)
  .post(Uploader.createUpload);

// // Get all images
// router.route('/uploads/').get(Uploader.getUploads);

// // Get all images
// router.route('/uploads/:id').get(Uploader.getUpload);

export default router;
