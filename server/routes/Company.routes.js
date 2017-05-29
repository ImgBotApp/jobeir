import { Router } from 'express';
import * as CompanyController from '../controllers/Company.controller';
import * as Upload from '../controllers/Upload.controller';
const router = new Router();

// Check if company name exists
router.route('/companies/check/:name').get(CompanyController.checkCompany);

// Get all companies
router.route('/companies').get(CompanyController.getCompanies);

// Get one post by company
router.route('/companies/:name').get(CompanyController.getCompany);

// Add a new company
router
  .route('/companies')
  .all(Upload.upload, Upload.resize)
  .post(CompanyController.createCompany);

// Delete a post by company
router.route('/companies/:name').delete(CompanyController.deleteCompany);

export default router;
