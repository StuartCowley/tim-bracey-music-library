const express = require('express');
const { createArtist, getAllArtists, getArtistById, updateArtist, deleteArtist } = require('../controllers/artist');

const artistRouter = express.Router();

// artistRouter.use(express.json());

artistRouter.post('/', createArtist);

artistRouter.get('/', getAllArtists);

artistRouter.get('/:id', getArtistById);

artistRouter.patch('/:id', updateArtist);

artistRouter.delete('/:id', deleteArtist);

module.exports = artistRouter;