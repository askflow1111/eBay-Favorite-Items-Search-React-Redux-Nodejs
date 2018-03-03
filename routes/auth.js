const express = require('express');
const controller = require('../controllers/usersController');

const router = express.Router();

const authHelpers = require('../services/auth/authHelpers');
const passport = require('../services/auth/local');

router.get('/login', (req, res) => {
  res.json({ message: 'login failed' })
});

router.get('/register', (req, res) => {
  res.json(res);
});

router.post('/register', controller.create);

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/api/user',
    failureRedirect: '/auth/login',
    failureFlash: false,
  })
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
