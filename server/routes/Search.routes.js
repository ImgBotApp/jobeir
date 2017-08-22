import { Router } from 'express';
import * as SearchController from '../controllers/Search.controller';
import { catchErrors } from '../errors/handleErrors';

const router = new Router();

// Search for jobs
router.route('/search/jobs').get(catchErrors(SearchController.searchJobs));

// Search for companies
router
  .route('/search/companies')
  .get(catchErrors(SearchController.getCompanies));

export default router;
