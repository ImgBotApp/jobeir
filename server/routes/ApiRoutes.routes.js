import { Router } from 'express';
import userRoutes from './User.routes';
import companyRoutes from './Company.routes';
import jobRoutes from './Job.routes';
import uploadRoutes from './Upload.routes';
import searchRoutes from './Search.routes';

const router = new Router();

router.use('/', companyRoutes);
router.use('/', jobRoutes);
router.use('/', userRoutes);
router.use('/', uploadRoutes);
router.use('/', searchRoutes);

export default router;
