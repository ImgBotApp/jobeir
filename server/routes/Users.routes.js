import { Router } from 'express';
import passport from 'passport';
import * as UsersController from '../controllers/Users.controller';
import { catchErrors } from '../errors/handleErrors';

const router = new Router();

router.route('/register').post(catchErrors(UsersController.registerUser));

router.route('/login').post(catchErrors(UsersController.loginUser));

router.route('/logout').post(UsersController.logoutUser);

router.route('/users/:id').get(catchErrors(UsersController.getUser));

router.route('/users/:id').put(catchErrors(UsersController.updateUser));

// Check authentication of the current token
router
  .route('/auth')
  .get(
    passport.authenticate('jwt', { session: false }),
    UsersController.checkAuthentication
  );

// Password reset routes
router.route('/reset').post(catchErrors(UsersController.resetPasswordRequest));

router.route('/password').post(catchErrors(UsersController.resetPassword));

export default router;
