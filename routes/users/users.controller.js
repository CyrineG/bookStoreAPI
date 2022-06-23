const users = require('../../models/users.model');
const novels = require('../../models/novels.model');

async function getAllUsers(req, res) {
  result = await users.getAllUsers();
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({ error: "can't fetch users" });
  }
}

async function getUserById(req, res) {
  if (req.params['id']) {
    result = await users.getUsersByid(req.params['id']);
    if (result != {}) res.status(200).json(result);
    else res.status(404).json({ error: "user doesn't exist" });
  } else {
    res.status(400).json({ error: 'user id undefined ' });
  }
}

async function addUser(req, res) {
  username = req.body.username;
  email = req.body.email;
  creation_date = new Date().toISOString();
  result = await users.addUser(username, email, creation_date);
  if (result) {
    res.status(200).json({ success: 'user added' });
  } else {
    res.status(500).json({ error: 'insert unsuccessful' });
  }
}

async function updateUserBio(req, res) {
  if (req.params['id']) {
    bio = req.body['bio'];
    result = await users.updateUserBio(req.params['id'], bio);
    if (result) {
      res.status(200).json('update successful');
    } else {
      res.status(500).json({ error: 'update unsuccessful' });
    }
  }
}

async function getUserNovels(req, res) {
  if (req.params['id']) {
    result = await novels.getNovelsByUser(req.params['id']);
    if (result) {
      res.status(200).json(result);
    } else res.status(404).json({ error: "user doesn't exist" });
  } else {
    res.status(400).json({ error: 'user id/title not defined ' });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUserBio,
  getUserNovels,
};
