const client = require('../database/db');

async function getAllUsers() {
  users = [];

  query = `SELECT * FROM "public"."Users";`;
  result = await client.query(query);
  return result.rows;
}

async function getUsersByid(id) {
  query = `SELECT * FROM "public"."Users" WHERE id='${id}';`;
  result = await client.query(query);
  return result.rows[0];
}

async function getUsersByUsernameEmail(username, email) {
  query = `SELECT * FROM "public"."Users" WHERE username='${username}' AND email='${email}';`;
  result = await client.query(query);
  if (result.rowCount) {
    return result.rows[0];
  }
  return false;
}

async function addUser(username, email, creation_date) {
  query = `INSERT INTO "public"."Users"(username, email, creation_date) VALUES ('${username}', '${email}', '${creation_date}');`;
  result = await client.query(query);
  if (result.rowCount) {
    return true;
  }
  return false;
}

async function updateUserBio(id, bio) {
  query = `UPDATE "public"."Users" SET bio='${bio}' WHERE id='${id}'`;
  result = await client.query(query);
  if (result.rowCount) {
    return true;
  }
  return false;
}

async function updateUserPic(id, pic) {
  query = `UPDATE "public"."Users" SET pic='${pic}' WHERE id='${id}'`;
  result = await client.query(query);
  if (result.rowCount) {
    return true;
  }
  return false;
}
module.exports = {
  getAllUsers,
  addUser,
  getUsersByid,
  updateUserBio,
  updateUserPic,
  getUsersByUsernameEmail,
};
