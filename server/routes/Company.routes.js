import { Router } from 'express';
import * as CompanyController from '../controllers/Company.controller';
const router = new Router();

// Get all companies
router.route('/companies').get(CompanyController.getCompanies);

// Get one post by company
router.route('/companies/:company').get(CompanyController.getCompany);

// Add a new company
router.route('/companies').post(CompanyController.addCompany);

// Delete a post by company
router.route('/companies/:company').delete(CompanyController.deleteCompany);

export default router;