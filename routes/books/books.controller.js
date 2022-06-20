const books = require('../../models/books.model');

function getAllBooks(req, res) {
  res.status(200).json(books);
}

module.exports = {
  getAllBooks,
};
