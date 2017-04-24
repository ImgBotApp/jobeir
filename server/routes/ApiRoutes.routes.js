import { Router } from 'express';
import userRoutes from './User.routes';
import companyRoutes from './Company.routes';
import jobRoutes from './Job.routes';

const router = new Router();

router.use('/', companyRoutes);
router.use('/', jobRoutes);
router.use('/', userRoutes);

export default router;
