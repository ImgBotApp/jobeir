import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import serverConfig from '../config/config';
import querystring from 'querystring';

const router = new Router();

// The middleware to set up the parameters for the authenticate middleware.
function checkReturnTo(req, res, next) {
  const returnTo = req.query['next'];
  const nextPath = req.headers.referer;

  if (returnTo) {
    // Maybe unnecessary, but just to be sure.
    req.session = req.session || {};

    req.session.returnTo = querystring.unescape(returnTo);
  }

  next();
}

// Google Auth
router.get(
  '/auth/google',
  checkReturnTo,
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
  }),
  function(req, res) {
    const token = jwt.sign(req.user, serverConfig.jwt);

    res.cookie('SID', token).redirect('/redirect');
  },
);

// Facebook Auth
router.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] }),
);

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
  }),
  function(req, res) {
    const token = jwt.sign(req.user, serverConfig.jwt);

    res.cookie('SID', token).redirect('/redirect');
  },
);

// Github Auth
router.get(
  '/auth/github',
  checkReturnTo,
  passport.authenticate('github', { scope: ['user:email'] }),
);

router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login',
  }),
  function(req, res) {
    const token = jwt.sign(req.user, serverConfig.jwt);

    res.cookie('SID', token).redirect('/redirect');
  },
);

export default router;
