import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import Account from '../models/Account';
import key from '../../keys';

const router = new Router();

router.get('/token', function(req, res) {
  res.status(200).send({
    data: [{ token: jwt.sign({}, key.JWT) }],
    error: []
  });
});

router.post('/register', function(req, res) {
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.status(202).send({
        data: [],
        error: [err],
      });
    }

    passport.authenticate('local')(req, res, function () {
      res.status(200).send(req.body);
    });
  });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.status(200).send(req.body);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).send(req.body);
});

router.get('/ping', function(req, res){
  res.status(200).send("pong!");
});

export default router;