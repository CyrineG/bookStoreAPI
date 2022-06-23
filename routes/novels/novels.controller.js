const novels = require('../../models/novels.model');

async function getAllNovels(req, res) {
  result = await novels.getAllNovels();
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({ error: "can't fetch novels" });
  }
}

async function getNovel(req, res) {
  if (req.params['id']) {
    result = await novels.getNovelByid(req.params['id']);
    if (result != {}) res.status(200).json(result);
    else res.status(404).json({ error: "novel doesn't exist" });
  } else {
    res.status(400).json({ error: 'novel id undefined ' });
  }
}

async function addNovel(req, res) {
  if (req.user.id && req.body['title']) {
    author_id = req.user.id;
    title = req.body['title'];
    creation_date = new Date().toISOString();
    summary = req.body['summary'];
    result = await novels.addNovel(author_id, title, creation_date, summary);
    if (result) {
      res.status(200).json('novel added successfully');
    } else res.status(404).json({ error: "user doesn't exist" });
  } else {
    res.status(400).json({ error: 'user id undefined ' });
  }
}

async function updateNovel(req, res) {
  if (req.body['user_id'] && req.params['id']) {
    novel_id = req.params['id'];
    author_id = req.body['user_id'];

    if (await novels.isAuthor(author_id, novel_id)) {
      title = req.body['title'];
      creation_date = creation_date = new Date().toISOString();
      summary = req.body['summary'];
      result = await novels.updateNovel(novel_id, title, summary);
      if (result) {
        res.status(200).json('update successful');
      }
    } else {
      res.status(403).json({ error: "user isn't novel author" });
    }
  } else {
    res.status(400).json({ error: 'user id and/or novel id not defined ' });
  }
}

module.exports = {
  getAllNovels,
  getNovel,
  addNovel,
  updateNovel,
};
