const novels = require('../../models/novels.model');

async function getAllNovels(req, res) {
  result = await novels.getAllNovels();
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json({ error: "can't fetch novels" });
  }
}

function getNovel(req, res) {
  if (req.params['id']) {
    result = await novels.getNovelByid(req.params['id']);
    if (result != {}) res.status(200).json(result);
    else res.status(404).json({ error: "novel doesn't exist" });
  } else {
    res.status(400).json({ error: 'novel id undefined ' });
  }
}

module.exports = {
  getAllNovels,
  getNovel,
};
