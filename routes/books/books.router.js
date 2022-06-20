const express = require('express');
const booksController = require('./books.controller');

const booksRouter = express.Router();

booksRouter.get('/all', booksController.getAllBooks);

module.exports = booksRouter;
