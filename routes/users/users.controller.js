const users = require('../../models/users.model');

async function getAllUsers(req, res) {
  users_list = await users.getAllUsers();
  if (users_list) {
    console.log(users_list);
    res.status(200).json(users_list);
  }
}

async function getUserById(req, res) {
  if (req.params['id']) {
    result = await users.getUsersByid(req.params['id']);
    console.log(result);
    res.status(200).json(result);
  } else {
    res.status(404).json({ error: "user doesn't exist" });
  }
}

async function addUser(req, res) {
  username = 'testuser';
  email = 'test@gmail.com';
  creation_date = new Date().toISOString();
  result = users.addUser(username, email, creation_date);
  if (result) {
    res.status(200).json('user added');
  }
}

async function updateUserBio(req, res) {
  if (req.params['id']) {
    bio = req.body['bio'];
    console.log(bio);
    result = users.updateUserBio(req.params['id'], bio);
    if (result) {
      res.status(200).json('update successful');
    }
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUserBio,
};
