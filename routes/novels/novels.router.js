const express = require('express');
const novelsController = require('./novels.controller');

const novelsRouter = express.Router();

novelsRouter.get('/all', novelsController.getAllNovels);

module.exports = novelsRouter;
