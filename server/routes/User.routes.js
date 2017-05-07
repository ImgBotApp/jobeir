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

router
  .route('/auth')
  .get(passport.authenticate('jwt', { session: false }), function(req, res) {
    res.status(200).send({
      data: {
        isAuthenticated: true,
        id: req.user._id,
      },
      errors: [],
    });
  });

export default router;
