import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import * as UsersController from '../controllers/Users.controller';

const router = new Router();

router.route('/register').post(UsersController.registerUser);

router.route('/login').post(UsersController.loginUser);

router.route('/logout').post(UsersController.logoutUser);

router.route('/users/:id').get(UsersController.getUser);

router.route('/users/:id').put(UsersController.updateUser);

// Check authentication of the current token
router
  .route('/auth')
  .get(
    passport.authenticate('jwt', { session: false }),
    UsersController.checkAuthentication
  );

// Password reset routes
router.route('/reset').post(UsersController.resetPasswordRequest);

router.route('/password').post(UsersController.resetPassword);

export default router;
