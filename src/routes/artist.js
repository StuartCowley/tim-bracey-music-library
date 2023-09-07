const express = require('express');
const { addArtist } = require('../controllers/artist');

const artistRouter = express.Router();

// artistRouter.use(express.json());

artistRouter.post('/', addArtist);

module.exports = artistRouter;