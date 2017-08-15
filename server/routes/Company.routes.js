import { Router } from 'express';
import * as CompanyController from '../controllers/Company.controller';
import * as Upload from '../controllers/Upload.controller';
const router = new Router();

// Check if company name exists
router.route('/companies/check/:name').get(CompanyController.checkCompany);

// Get all companies
router.route('/companies').get(CompanyController.getCompanies);

// Create a new company
router.route('/companies').post(CompanyController.createCompany);

// Update a company
router.route('/companies/:id').put(CompanyController.updateCompany);

// Invite a member
router
  .route('/companies/:id/invite')
  .post(CompanyController.inviteCompanyMember);

// Invite a member
router
  .route('/companies/:id/invite/:inviteToken')
  .post(CompanyController.acceptInviteCompanyMember);

// Get one company
router.route('/companies/:id').get(CompanyController.getCompany);

// Add a new company
router
  .route('/companies/:id/upload/:section')
  .all(Upload.upload, Upload.resize)
  .post(CompanyController.upload);

// Delete a post by company
router.route('/companies/:id').delete(CompanyController.deleteCompany);

export default router;
