import { Router } from 'express';
import * as CompanyController from '../controllers/Company.controller';
const router = new Router();

// Get all companies
router.route('/posts').get(CompanyController.getCompanies);

// Get one post by company
router.route('/posts/:company').get(CompanyController.getCompany);

// Add a new company
router.route('/posts').post(CompanyController.addCompany);

// Delete a post by company
router.route('/posts/:company').delete(CompanyController.deleteCompany);

export default router;