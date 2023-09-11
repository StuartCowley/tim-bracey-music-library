const express = require('express');
const { createArtist, getAllArtists, getArtistById } = require('../controllers/artist');

const artistRouter = express.Router();

// artistRouter.use(express.json());

artistRouter.post('/', createArtist);

artistRouter.get('/', getAllArtists);

artistRouter.get('/:id', getArtistById);

module.exports = artistRouter;