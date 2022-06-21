const books = require('../../models/novels.model');

/*
  we have 3 resources rn:
  - author
  - book
  - chapter

  our endpoints will be:
  GET
  - /authors
  - /author/:id -> author profile
  - /author/:id/books/ -> author books
  - /author/:id/book/:id -> a particular book
  - /author/:id/book/:id/chapters -> book chapters
  - /author/:id/book/:id/chapter/:id -> a particular chapter

  - /books
  - /book/:genre
  - /book/:id
  - /book/:id/chapters
  - /book/:id/chapter/:id


  POST (author creates own work)
  - /author -> creates new author
  - /author/:id/book -> creates new book
  - author/:id/book/:id/chapter -> creates new chapter

  PUT (only author can update their work)
  - /author/:id -> update author profile
  - /author/:id/book/:id -> update a particular book
  - /author/:id/book/:id/chapter/:id -> update a particular chapter

  DELETE (only author can delete their work)
  - /author/:id -> delete author profile
  - /author/:id/book/:id -> delete a particular book
  - /author/:id/book/:id/chapter/:id -> delete a particular chapter
  */

function getAllNovels(req, res) {
  res.status(200).json(books);
}

function getNovel(req, res) {
  //book.title == req.params.title
}

function addNovel(req, res) {
  //create new book
}

function updateNovel(req, res) {
  //update book
}

function deleteNovel(req, res) {
  //delete book
}
module.exports = {
  getAllNovels,
};
