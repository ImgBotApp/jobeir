import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../models/User';
import serverConfig from '../config/config';

const router = new Router();

router.post('/register', function(req, res) {
  if (!req.body.email || !req.body.password) {
    return res
      .status(202)
      .send({
        data: [],
        errors: [{
          error: "MISSING_EMAIL_OR_PASSWORD",
          message:'Email and password are required'
        }],
      });
  } else {
    const newUser = new User ({
      email: req.body.email,
      password: req.body.password,
    });

    newUser.save(err => {
      if (err) {
        return res
          .status(409)
          .send({
            data: [],
            errors: [{
              error: "USER_ALREADY_EXISTS",
              message: "A user with that email already exists."
            }],
          });
      } else {
        const token = jwt.sign(newUser, serverConfig.jwt);

        return res
          .cookie('SID', token)
          .status(200)
          .send({
            data: [req.body],
            errors: [],
          });
      }
    });
  }
});

router.post('/login', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res
        .status(401)
        .send({
          data: [],
          errors: [{
            error: "INVALID_EMAIL_OR_PASSWORD",
            message:'Invalid email or password'
          }],
        });
    } else {
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (!err && isMatch) {
          const token = jwt.sign(user, serverConfig.jwt);

          res
            .status(200)
            .send({
              data: { isAuthenticated: true, token },
              errors: []
            });
        } else {
          res
          .status(401).send({
            data: [],
            errors: [{
              error: "INVALID_EMAIL_OR_PASSWORD",
              message:'Invalid email or password'
            }],
          });
        }
      });
    }
  });
});

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

router.post('/logout', function(req, res) {
  req.logout();
  res.status(200).send({
    data: [],
    errors: []
  });
});

export default router;