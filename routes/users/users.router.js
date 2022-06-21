const usersController = require('./users.controller');
const express = require('express');

const usersRouter = express.Router();

usersRouter.get('/all', usersController.getAllUsers);
usersRouter.get('/:id', usersController.getUserById);
usersRouter.post('/', usersController.addUser);
usersRouter.put('/:id', usersController.updateUserBio);
module.exports = usersRouter;
