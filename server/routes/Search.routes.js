import { Router } from 'express';
import * as SearchController from '../controllers/Search.controller';
const router = new Router();

// Search for jobs
router.route('/search/jobs').get(SearchController.searchJobs);

// Search for companies
router.route('/search/companies').get(SearchController.getCompanies);

export default router;
