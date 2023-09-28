const express = require('express');
const { getAllAlbums, getAlbumById, updateAlbum, deleteAlbum } = require('../controllers/album');


const albumRouter = express.Router();

albumRouter.get('/', getAllAlbums);

albumRouter.get('/:id', getAlbumById);

albumRouter.patch('/:id', updateAlbum);

albumRouter.delete('/:id', deleteAlbum);

module.exports = albumRouter;