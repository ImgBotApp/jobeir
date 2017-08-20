import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import querystring from 'querystring';

const router = new Router();

// The middleware to set up the parameters for the authenticate middleware.
const checkReturnTo = (req, res, next) => {
  const returnTo = req.query.next;

  if (returnTo) {
    // Maybe unnecessary, but just to be sure.
    req.session = req.session || {};

    req.session.returnTo = querystring.unescape(returnTo);
  }

  next();
};

const buildKey = user => ({
  email: user.email,
  _id: user._id
});

// Google Auth
router.get(
  '/auth/google',
  checkReturnTo,
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  (req, res) => {
    const token = jwt.sign(buildKey(req.user), process.env.JWT);

    res.cookie('SID', token).redirect('/redirect');
  }
);

// Facebook Auth
router.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login'
  }),
  (req, res) => {
    const token = jwt.sign(buildKey(req.user), process.env.JWT);

    res.cookie('SID', token).redirect('/redirect');
  }
);

// Github Auth
router.get(
  '/auth/github',
  checkReturnTo,
  passport.authenticate('github', { scope: ['user.email:email'] })
);

router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login'
  }),
  (req, res) => {
    const token = jwt.sign(buildKey(req.user), process.env.JWT);

    res.cookie('SID', token).redirect('/redirect');
  }
);

export default router;
