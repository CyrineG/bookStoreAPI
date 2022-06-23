const auth = require('../../utils/authMiddelware');
const users = require('../../models/users.model');
const redis = require('../../database/redis');

async function login(req, res) {
  if (await users.getUsersByUsernameEmail(req.body.username, req.body.email)) {
    user = { username: req.body.username, email: req.body.email };
    accessToken = auth.generateAccessToken(user);
    refreshToken = auth.generateRefreshToken(user);

    await redis.set(refreshToken, 'valid');
    res.json({ refreshToken: refreshToken, acessToken: accessToken });
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
  login,
  newAccessToken,
  logout,
};
