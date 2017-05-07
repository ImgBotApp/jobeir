import { Router } from 'express';
import * as CompanyController from '../controllers/Company.controller';
import multer from 'multer';
const router = new Router();
const upload = multer({ dest: 'uploads/' });

// Check if company name exists
router.route('/companies/check/:name').get(CompanyController.checkCompany);

// Get all companies
router.route('/companies').get(CompanyController.getCompanies);

// Get one post by company
router.route('/companies/:name').get(CompanyController.getCompany);

// Add a new company
router.route('/companies').post(CompanyController.createCompany);

// Delete a post by company
router.route('/companies/:name').delete(CompanyController.deleteCompany);

router
  .route('/companies/upload/logo', upload.single('logo'))
  .post(CompanyController.uploadCompanyLogo);

export default router;
