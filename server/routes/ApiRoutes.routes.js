import { Router } from 'express';
import userRoutes from './User.routes';
import companyRoutes from './Company.routes';

const router = new Router();

router.use('/', userRoutes);
router.use('/', companyRoutes);

export default router;