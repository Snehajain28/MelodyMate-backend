
const express = require('express');
const { AddSongController, getAllSongController } = require('../controller/SongsController');
const router = express.Router();

router.post('/add-song',AddSongController);
router.get('/all-song',getAllSongController);

module.exports = router;