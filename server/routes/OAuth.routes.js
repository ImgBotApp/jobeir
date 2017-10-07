import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = new Router();

const buildKey = user => ({
  email: user.email,
  _id: user._id
});

// Google Auth
router.get(
  '/auth/google',
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

// Github Auth with no scope
// https://developer.github.com/apps/building-integrations/setting-up-and-registering-oauth-apps/about-scopes-for-oauth-apps/
router.get('/auth/github', passport.authenticate('github'));

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
