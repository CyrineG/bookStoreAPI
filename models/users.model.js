const client = require('../connection');

async function getAllUsers() {
  console.log(creation_date);
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

async function addUser(username, email, creation_date) {
  query = `INSERT INTO "public"."Users"(username, email, creation_date) VALUES ('${username}', '${email}', '${creation_date}');`;
  await client.query(query, (err, res) => {
    if (err) throw err;
    client.end();
    return res;
  });
}

async function updateUserBio(id, bio) {
  query = `UPDATE "public"."Users" SET bio='${bio}' WHERE id='${id}'`;
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
};
