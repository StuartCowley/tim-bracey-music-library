const express = require('express');
const { createArtist } = require('../controllers/artist');

const artistRouter = express.Router();

// artistRouter.use(express.json());

artistRouter.post('/', createArtist);

module.exports = artistRouter;