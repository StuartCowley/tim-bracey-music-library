const express = require('express');
const { createArtist, getAllArtists, getArtistById, updateArtist, deleteArtist, createAlbum } = require('../controllers/artist');

const artistRouter = express.Router();

// artistRouter.use(express.json());

artistRouter.post('/', createArtist);

artistRouter.get('/', getAllArtists);

artistRouter.get('/:id', getArtistById);

artistRouter.patch('/:id', updateArtist);

artistRouter.delete('/:id', deleteArtist);

artistRouter.post('/:id/albums', createAlbum);

module.exports = artistRouter;