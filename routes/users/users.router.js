const usersController = require('./users.controller');
const express = require('express');

const usersRouter = express.Router();

usersRouter.get('/all', usersController.getAllUsers);
usersRouter.get('/:id', usersController.getUserById);

module.exports = usersRouter;
