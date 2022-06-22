// 0: {
//   series_id: 0,
//   title: 'title0',
//   url: 'url of page',
//   description: 'string',
//   image:
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrXCpX09G89dlmLstxycOjWful86RVH8RyerZ5M0eX-ScePjXFWUmBMyIGmDEkwAEVcOs&usqp=CAU',
//   type: 'Artbook',
//   year: 'string',
//   bayesian_rating: 0,
//   rating_votes: 0,
//   genres: ['sci-fi'],
//   authors: [
//     {
//       name: 'string',
//       author_id: 0,
//       type: 'Author',
//     },
//   ],
//   rank: 1,

//   last_updated: {
//     timestamp: 0,
//     as_rfc3339: '2019-08-24T14:15:22Z',
//     as_string: 'string',
//   },
// },

const client = require('../connection');

async function getAllNovels() {
  novels = [];

  query = `SELECT * FROM "public"."Novels";`;
  result = await client.query(query);
  return result.rows;
}

async function getNovelsByUser(user_id) {
  query = `SELECT * FROM "public"."Novels" WHERE author_id='${user_id}';`;
  result = await client.query(query);
  return result.rows;
}

async function getNovelByid(id) {
  query = `SELECT * FROM "public"."Novels" WHERE id='${id}';`;
  result = await client.query(query);
  return result.rows[0];
}

async function addNovel(author_id, title, creation_date, summary) {
  query = `INSERT INTO "public"."Novels"(author_id, title, creation_date, summary) VALUES (${author_id}, '${title}', '${creation_date}','${summary}');`;
  result = await client.query(query);
  if (result.rowCount) {
    return true;
  }
  return false;
}

async function updateNovel(id, title, summary) {
  query = `UPDATE "public"."Novels" SET title='${title}', summary='${summary}' WHERE id=${id};`;
  result = await client.query(query);
  if (result.rowCount) {
    return true;
  }
  return false;
}

async function isAuthor(user_id, novel_id) {
  query = `SELECT author_id FROM "public"."Novels" WHERE id='${novel_id}'`;
  result = await client.query(query);
  if (user_id == result.rows[0]['author_id']) {
    return true;
  }
  return false;
}

module.exports = {
  getAllNovels,
  addNovel,
  getNovelByid,
  getNovelsByUser,
  updateNovel,
  isAuthor,
};
