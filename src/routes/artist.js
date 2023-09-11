const express = require('express');
const { createArtist, getArtists } = require('../controllers/artist');

const artistRouter = express.Router();

// artistRouter.use(express.json());

artistRouter.post('/', createArtist);

artistRouter.get('/', getArtists);

module.exports = artistRouter;