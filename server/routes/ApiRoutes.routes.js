import { Router } from 'express';
import userRoutes from './Users.routes';
import companyRoutes from './Company.routes';
import jobsRoutes from './Jobs.routes';
import uploadRoutes from './Upload.routes';
import searchRoutes from './Search.routes';

const router = new Router();

router.use('/', companyRoutes);
router.use('/', jobsRoutes);
router.use('/', userRoutes);
router.use('/', uploadRoutes);
router.use('/', searchRoutes);

export default router;
