import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import serverConfig from '../config/config';
import querystring from 'querystring';

const router = new Router();

// The middleware to set up the parameters for the authenticate middleware.
function checkReturnTo(req, res, next) {
  console.log(req);
  console.log(req.headers.referer);
  const returnTo = req.query['returnTo'];
  const nextPath = req.headers.referer;
  if (returnTo) {
    // Maybe unnecessary, but just to be sure.
    req.session = req.session || {};

    // Set returnTo to the absolute path you want to be redirect to after the authentication succeeds.
    req.session.returnTo = getFullUrl(querystring.unescape(returnTo));
  }
  next(null, nextPath);
}

// Google Auth
router.get(
  '/auth/google',
  checkReturnTo,
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
  '/auth/google/callback',
  checkReturnTo,
  passport.authenticate('google', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
  }),
  function(req, res) {
    const token = jwt.sign(req.user, serverConfig.jwt);

    res.cookie('SID', token).redirect('/dashboard');
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
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
  }),
  function(req, res) {
    const token = jwt.sign(req.user, serverConfig.jwt);

    res.cookie('SID', token).redirect('/dashboard');
  },
);

// Github Auth
router.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email'] }),
);

router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
  }),
  function(req, res) {
    const token = jwt.sign(req.user, serverConfig.jwt);

    res.cookie('SID', token).redirect('/dashboard');
  },
);

export default router;
