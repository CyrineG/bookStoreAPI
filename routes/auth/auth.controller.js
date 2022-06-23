const auth = require('../../utils/authMiddelware');
const users = require('../../models/users.model');

let refreshTokens = [];

async function login(req, res) {
  if (await users.getUsersByUsernameEmail(req.body.username, req.body.email)) {
    user = { username: req.body.username, email: req.body.email };
    accessToken = auth.generateAccessToken(user);
    refreshToken = auth.generateRefreshToken(user);
    // save in redis
    refreshTokens.push(refreshToken);
    res.json({ refreshToken: refreshToken, acessToken: accessToken });
  } else {
    res.status(404).json({ error: 'wrong credentials' });
  }
}

function newAccessToken(req, res) {
  refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  accessToken = auth.verifyRefreshToken(refreshToken);
  res.status(200).json({ accessToken: accessToken });
}

function logout(req, res) {
  refreshToken = req.body.token;
  console.log(refreshTokens);
  //delete fromredis
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  console.log(refreshTokens);
  res.sendStatus(204);
}

module.exports = {
  login,
  newAccessToken,
  logout,
};
