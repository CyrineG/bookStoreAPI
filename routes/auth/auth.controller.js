const auth = require('../../utils/authMiddelware');
const users = require('../../models/users.model');
const redis = require('../../database/redis');
const bcrypt = require('bcrypt');

async function signup(req, res) {
  username = req.body.username;
  email = req.body.email;
  try {
    pwd = await bcrypt.hash(req.body.pwd, 10);
    console.log(pwd);
    console.log('hello');
    creation_date = new Date().toISOString();
    result = await users.addUser(username, email, pwd, creation_date);
    if (result) {
      res.status(200).json({ success: 'user added' });
    } else {
      res.status(500).json({ error: 'insert unsuccessful' });
    }
  } catch {
    res.status(500).send();
  }
}

async function login(req, res) {
  user = await users.getUsersByEmail(req.body.email);
  if (user) {
    try {
      if (await bcrypt.compare(req.body.pwd, user.pwd)) {
        user = { id: user.id, email: user.email, username: user.username };
        accessToken = auth.generateAccessToken(user);
        refreshToken = auth.generateRefreshToken(user);

        await redis.set(refreshToken, 'valid');
        res.json({ refreshToken: refreshToken, acessToken: accessToken });
      }
    } catch {
      res.status(500).send();
    }
  } else {
    res.status(404).json({ error: 'wrong credentials' });
  }
}

async function newAccessToken(req, res) {
  refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!(await redis.get(refreshToken))) return res.sendStatus(403);
  if (!auth.verifyRefreshToken(refreshToken)) return res.sendStatus(403);

  user = auth.verifyRefreshToken(refreshToken);
  accessToken = auth.generateAccessToken(user);
  return res.status(200).json({ accessToken: accessToken });
}

async function logout(req, res) {
  refreshToken = req.body.token;
  await redis.del(refreshToken);
  res.sendStatus(204);
}

module.exports = {
  signup,
  login,
  newAccessToken,
  logout,
};
