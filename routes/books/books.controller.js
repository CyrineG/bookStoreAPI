const books = require('../../models/books.model');

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


  ==> we can use mongoDB:
  - collection of authors (have list of their book id)
  - collection of books (have list of author id, and list of chapters(chapter has title and location) ) 
  - save chapters as PDF/DOCX with id as name (https://www.mongodb.com/community/forums/t/what-is-the-best-way-to-store-an-actual-document-file/111714/2)


  here's an exple of the data :

  books = {
    0: {
    series_id: 0,
    title: 'title0',
    url: 'url of page',
    description: 'string',
    created: 'date',
    updated: 'date'
    genres: ['sci-fi'],
    authors: [ author_id ],
    chapters:[
      {
        title: 'string',
        chapter_id: 0,
        location: 'pdf/DOCX location',
      }
    ]
  },
  }

  authors = {
    11: {
      author_id: 11,
      name: 'string',
      email: 'string@email.com',
      creation_date: 'date',
      bio: 'string',
      photo: 'string',
      favs_books : [book_id, book_id, book_id],
      books : [ book_id, book_id, book_id]
    }
  }

  BUT AO3 uses SQL TTATT

  behi so ken na3mlouh SQL we'll need:
  - table authors
  - table books
  
  author has:
    author_id: 'string'
    name: 'string',
    email: 'string@email.com',
    creation_date: 'date',
    bio: 'string',
    photo: 'string',
    favs_books : [book_id, book_id, book_id],
    books : [ book_id, book_id, book_id]
  
  book has:
    series_id: 'string',
    title: 'title0',
    url: 'url of page',
    description: 'string',
    created: 'date',
    updated: 'date'
    genres: ['sci-fi'],
    authors: [ author_id ],
    chapters:[ chapter_id, chapter_id, chapter_id]

  chapter:
    title: 'string',
    chapter_id: 0,
    location: 'pdf/DOCX location',
      

*/

/* 
from ao3:

chapter table:
CREATE TABLE `chapters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` int(11) DEFAULT '1',
  `work_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `posted` tinyint(1) NOT NULL DEFAULT '0',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `summary` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `word_count` int(11) DEFAULT NULL,
  `hidden_by_admin` tinyint(1) NOT NULL DEFAULT '0',
  `published_at` date DEFAULT NULL,
  `endnotes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `content_sanitizer_version` smallint(6) NOT NULL DEFAULT '0',
  `notes_sanitizer_version` smallint(6) NOT NULL DEFAULT '0',
  `summary_sanitizer_version` smallint(6) NOT NULL DEFAULT '0',
  `endnotes_sanitizer_version` smallint(6) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `works_chapter_index` (`work_id`),
  KEY `index_chapters_on_work_id` (`work_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `series`;

CREATE TABLE `series` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `summary` text COLLATE utf8mb4_unicode_ci,
  `series_notes` text COLLATE utf8mb4_unicode_ci,
  `hidden_by_admin` tinyint(1) NOT NULL DEFAULT '0',
  `restricted` tinyint(1) NOT NULL DEFAULT '1',
  `complete` tinyint(1) NOT NULL DEFAULT '0',
  `summary_sanitizer_version` smallint(6) NOT NULL DEFAULT '0',
  `series_notes_sanitizer_version` smallint(6) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;


DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `confirmation_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `login` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `confirmed_at` datetime DEFAULT NULL,
  `encrypted_password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password_salt` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `suspended` tinyint(1) NOT NULL DEFAULT '0',
  `banned` tinyint(1) NOT NULL DEFAULT '0',
  `invitation_id` int(11) DEFAULT NULL,
  `suspended_until` datetime DEFAULT NULL,
  `out_of_invites` tinyint(1) NOT NULL DEFAULT '1',
  `failed_attempts` int(11) DEFAULT '0',
  `accepted_tos_version` int(11) DEFAULT NULL,
  `confirmation_sent_at` datetime DEFAULT NULL,
  `reset_password_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reset_password_sent_at` datetime DEFAULT NULL,
  `remember_created_at` datetime DEFAULT NULL,
  `sign_in_count` int(11) DEFAULT '0',
  `current_sign_in_at` datetime DEFAULT NULL,
  `last_sign_in_at` datetime DEFAULT NULL,
  `current_sign_in_ip` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_sign_in_ip` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unlock_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `locked_at` datetime DEFAULT NULL,
  `recently_reset` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_users_on_login` (`login`),
  UNIQUE KEY `index_users_on_reset_password_token` (`reset_password_token`),
  UNIQUE KEY `index_users_on_unlock_token` (`unlock_token`),
  UNIQUE KEY `index_users_on_confirmation_token` (`confirmation_token`),
  UNIQUE KEY `index_users_on_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
*/

function getAllBooks(req, res) {
  res.status(200).json(books);
}

function getBook(req, res) {
  //book.title == req.params.title
}

function addBook(req, res) {
  //create new book
}

function updateBook(req, res) {
  //update book
}

function deleteBook(req, res) {
  //delete book
}
module.exports = {
  getAllBooks,
};
