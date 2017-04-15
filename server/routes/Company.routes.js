import { Router } from 'express';
import * as CompanyController from '../controllers/Company.controller';
const router = new Router();

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

export default router;