const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db/index');
const app = require('../src/app');
// const { createAlbum } = require('../src/controllers/album');
// const { createArtist } = require('../src/controllers/artist');

describe('create album', () => {

  let artist;
  beforeEach(async () => {
    const { rows } = await db.query('INSERT INTO Artists (name, genre) VALUES($1, $2) RETURNING *', [
      'Periphery',
      'Progressive Metal',
    ]);
    
    artist = rows[0];
  });

  describe('/albums', () => {
    describe('POST', () => {
      it('creates a new album in the database', async () => {
        const { status, body } = await request(app).post(`/artists/${artist.id}/albums`).send({ name: 'Periphery V: Djent is not a Genre', year: 2023, artist_id: artist.id });

        expect(status).to.equal(201);
        expect(body.name).to.equal('Periphery V: Djent is not a Genre');
        expect(body.year).to.equal(2023);
        expect(body.artist_id).to.equal(artist.id);

      });
    });
  });
});