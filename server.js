const express = require('express');
const http = require('http');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/.env' });

const novelsRouter = require('./routes/novels/novels.router');
const usersRouter = require('./routes/users/users.router');
const client = require('./connection');

const auth = require('./utils/authMiddelware');
const authRouter = require('./routes/auth/auth.router.js');

const app = express();
app.use(cors());

app.use(express.json());

app.use(authRouter);
app.use('/novels', auth.authentificateToken, novelsRouter);
app.use('/users', auth.authentificateToken, usersRouter);
app.get('/', (req, res) => {
  res.status(200).json('hello');
});

async function startServer() {
  await client.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');
  });
  const PORT = process.env.PORT;
  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(`lstening on port ${PORT}`);
  });
}

startServer();
