const usersController = require('./users.controller');
const express = require('express');
const { user } = require('pg/lib/defaults');

const usersRouter = express.Router();
/*
our endpoints will be:
GET
- /author/all
- /author/:id -> author profile
- /author/:id/books/ -> author books

POST (author creates own work)
- /author -> creates new author
- /author/:id/book -> creates new book
TODO
- author/:id/book/:id/chapter -> creates new chapter

PUT (only author can update their work)
- /author/:id -> update author profile
- /author/:id/book/:id -> update a particular book
TODO
- /author/:id/book/:id/chapter/:id -> update a particular chapter

DELETE (only author can delete their work)
- /author/:id -> delete author profile
- /author/:id/book/:id -> delete a particular book
TODO
- /author/:id/book/:id/chapter/:id -> delete a particular chapter


*/

usersRouter.get('/all', usersController.getAllUsers);
usersRouter.get('/:id', usersController.getUserById);
usersRouter.get('/:id/novels', usersController.getUserNovels);

usersRouter.post('/', usersController.addUser);
usersRouter.post('/:id/novels', usersController.addNovel);

usersRouter.put('/:id', usersController.updateUserBio);
usersRouter.put('/:user_id/novels/:novel_id', usersController.updateNovel);

module.exports = usersRouter;
