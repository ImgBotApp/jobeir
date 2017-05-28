import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import * as UserController from '../controllers/User.controller';

const router = new Router();

router.route('/register').post(UserController.registerUser);

router.route('/login').post(UserController.loginUser);

router.route('/logout').post(UserController.logoutUser);

router.route('/users/:id').get(UserController.getUser);

router.route('/users/:id').put(UserController.updateUser);

// Check authentication of the current token
router
  .route('/auth')
  .get(
    passport.authenticate('jwt', { session: false }),
    UserController.checkAuthentication
  );

// Password reset routes
router.route('/reset').post(UserController.resetPasswordRequest);

router.route('/password').post(UserController.resetPassword);

export default router;
