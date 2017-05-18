import { Router } from 'express';
import * as Uploader from '../controllers/Upload.controller';
const router = new Router();

import multer from 'multer';

// multer options
const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    console.log('fired multer fileFilter');
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "That filetype isn't allowed!" }, false);
    }
  },
};

// create middleware to be used before uploadeing
const upload = multer(multerOptions).single('photo');

// // Get all jobs
// router.route('/jobs').get(JobController.getJobs);

// // Get one job by ID
// router.route('/jobs/:id').get(JobController.getJob);

// Upload a new image

router
  .route('/upload')
  .all(upload, Uploader.resize)
  .post(Uploader.createUpload);

// // Get all images
// router.route('/uploads/').get(Uploader.getUploads);

// // Get all images
// router.route('/uploads/:id').get(Uploader.getUpload);

export default router;
