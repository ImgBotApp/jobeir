import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../models/User';
import serverConfig from '../config/config';

const router = new Router();

router.post('/register', function(req, res) {
  if (!req.body.email || !req.body.password) {
    return res.status(202).send({
      data: [],
      error: [{message:'Email and password are required'}],
    });
  } else {
    const newUser = new User ({
      email: req.body.email,
      password: req.body.password,
    });

    newUser.save(err => {
      if (err) {
        return res.status(202).send({
          data: [],
          error: [err],
        });
      } else {
        return res.status(200).send({
          data: [req.body],
          error: [],
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
      res.status(200).send({
        data: [],
        error: [{message:'User does not exist'}],
      });
    } else {
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (!err && isMatch) {
          const token = jwt.sign(user, serverConfig.jwt);

          res.status(200).send({
            data: { authenticated: true, token },
            error: []
          });
        } else {
          res.status(200).send({
            data: [],
            error: [err]
          });
        }
      });
    }
  });
});

router.get('/dashboard', passport.authenticate('jwt', { session: false }), function(req, res) {
  res.send('It worked! User id is: ' + req.user._id);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).send(req.body);
});

router.get('/ping', function(req, res){
  res.status(200).send("pong!");
});

export default router;