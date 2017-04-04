import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import * as UserController from '../controllers/User.controller';

const router = new Router();

router.route('/register').post(UserController.registerUser);

router.route('/login').post(UserController.loginUser);

router.route('/logout').post(UserController.logoutUser);

router.route('/users/:id').get(UserController.getUser);

router.get('/auth', passport.authenticate('jwt', { session: false }), function(req, res) {
  res
    .status(200)
    .send({
      data: {
        isAuthenticated: true,
        userId: req.user._id,
      },
      errors: []
    });
});

export default router;
