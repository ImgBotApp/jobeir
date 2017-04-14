import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import serverConfig from '../config/config';

const router = new Router();

// Google Auth
router.get('/auth/google',
  passport.authenticate('google', {  scope : ['profile', 'email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    const token = jwt.sign(req.user, serverConfig.jwt);
    
    res.cookie('SID', token).redirect('/dashboard');
  });

// Facebook Auth
router.get('/auth/facebook',
  passport.authenticate('facebook', { scope: [ 'email' ] }));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    const token = jwt.sign(req.user, serverConfig.jwt);
    
    res.cookie('SID', token).redirect('/dashboard');
  });

// Github Auth
router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    const token = jwt.sign(req.user, serverConfig.jwt);
    
    res.cookie('SID', token).redirect('/dashboard');
  });

export default router;