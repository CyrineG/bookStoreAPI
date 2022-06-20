const express = require('express');
const http = require('http');
const cors = require('cors');

const booksRouter = require('./routes/books/books.router');

const app = express();
app.use(cors());

app.use(express.json());

app.use('/books', booksRouter);
app.get('/', (req, res) => {
  res.status(200).json('hello');
});

const PORT = 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`lstening on port ${PORT}`);
});
