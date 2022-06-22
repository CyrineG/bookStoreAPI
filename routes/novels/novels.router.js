const express = require('express');
const novelsController = require('./novels.controller');

const novelsRouter = express.Router();
/*
  GET
  - /books
  - /book/:id

  TO DO
  GET
  - /book/:genre
  - /book/:id/chapters
  - /book/:id/chapter/:id

  */

novelsRouter.get('/all', novelsController.getAllNovels);
novelsRouter.get('/:id', novelsController.getNovel);

module.exports = novelsRouter;
