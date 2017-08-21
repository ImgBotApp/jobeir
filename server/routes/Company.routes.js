import { Router } from 'express';
import * as CompanyController from '../controllers/Company.controller';
import * as Upload from '../controllers/Upload.controller';
import { catchErrors } from '../errors/handleErrors';

const router = new Router();

// Check if company name exists
router
  .route('/companies/check/:name')
  .get(catchErrors(CompanyController.checkCompany));

// Get all companies
router.route('/companies').get(catchErrors(CompanyController.getCompanies));

// Create a new company
router.route('/companies').post(catchErrors(CompanyController.createCompany));

// Update a company
router
  .route('/companies/:id')
  .put(catchErrors(CompanyController.updateCompany));

// Invite a member
router
  .route('/companies/:id/invites')
  .post(catchErrors(CompanyController.inviteCompanyMember));

// Invite a member
router
  .route('/companies/:id/invites/:inviteId')
  .put(catchErrors(CompanyController.acceptInviteCompanyMember));

// Remove a member
router
  .route('/companies/:id/members/:memberId')
  .delete(catchErrors(CompanyController.removeCompanyMember));

// Get one company
router.route('/companies/:id').get(catchErrors(CompanyController.getCompany));

// Add a new company
router
  .route('/companies/:id/upload/:section')
  .all(Upload.upload, Upload.resize)
  .post(catchErrors(CompanyController.upload));

// Delete a post by company
router
  .route('/companies/:id')
  .delete(catchErrors(CompanyController.deleteCompany));

export default router;
