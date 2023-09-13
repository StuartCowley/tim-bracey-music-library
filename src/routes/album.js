const express = require('express');
const { getAllAlbums, getAlbumById } = require('../controllers/album');


const albumRouter = express.Router();

albumRouter.get('/', getAllAlbums);

albumRouter.get('/:id', getAlbumById);

module.exports = albumRouter;