const express = require('express');
const authController = require('./auth.controller');
const authRouter = express.Router();

authRouter.post('/login', authController.login);

authRouter.post('/signup', authController.signup);

authRouter.post('/token', authController.newAccessToken);

authRouter.delete('/logout', authController.logout);

module.exports = authRouter;
