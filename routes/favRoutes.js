const express = require('express');
const favoriteController = require('../controllers/favoriteController');
const authHelpers = require('../services/auth/authHelpers');

const favRoutes = express.Router();

favRoutes.post('/show', favoriteController.show);
favRoutes.post('/create', authHelpers.loginRequired, favoriteController.create);
favRoutes.delete('/destroy', favoriteController.destroy);

module.exports = favRoutes;