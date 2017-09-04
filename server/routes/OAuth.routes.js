import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import querystring from 'querystring';
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
    console.log(req.user);
    console.log(process.env.JWT);
    const token = jwt.sign(buildKey(req.user), process.env.JWT);
    console.log(token);

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
