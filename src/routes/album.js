const express = require('express');
const { getAllAlbums, getAlbumById, updateAlbum } = require('../controllers/album');


const albumRouter = express.Router();

albumRouter.get('/', getAllAlbums);

albumRouter.get('/:id', getAlbumById);

albumRouter.patch('/:id', updateAlbum);

module.exports = albumRouter;