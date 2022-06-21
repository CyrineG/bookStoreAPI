const users = require('../../models/users.model');

function getAllUsers(req, res) {
  res.status(200).json(users);
}

function getUserById(req, res) {
  if (users[req.params.id]) {
    res.status(200).json(users[req.params.id]);
  } else {
    res.status(404).json({ error: "user doesn't exist" });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
};
