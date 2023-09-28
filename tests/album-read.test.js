const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('Read Albums', () => {
  let artist;
  let albums = [];
  beforeEach(async () => {
    const { rows } = await db.query('INSERT INTO Artists (name, genre) VALUES($1, $2) RETURNING *', [
      'Periphery',
      'Progressive Metal',
    ]);
    
    artist = rows[0];

    const responses = await Promise.all([
      db.query('INSERT INTO Albums (name, year, artist_id) VALUES($1, $2, $3) RETURNING *', [
        'Periphery V: Djent is not a Genre',
        2023,
        artist.id
      ]),
      db.query('INSERT INTO Albums (name, year, artist_id) VALUES($1, $2, $3) RETURNING *', [
        'Periphery IV: Hail Stan',
        2019,
        artist.id
      ]),
      db.query('INSERT INTO Albums (name, year, artist_id) VALUES($1, $2, $3) RETURNING *', [
        'Periphery III: Select Difficulty',
        2016,
        artist.id
      ]),
    ])

    albums = responses.map(({ rows: album }) => album[0]);

  });

  

  describe('GET /albums', () => {
    it('returns all albums in the database', async () => {
      const { status, body } = await request(app).get('/albums').send();
      // console.log(artist);
      // console.log(albums);
      expect(status).to.equal(200);
      expect(body.length).to.equal(3);

      body.forEach(albumRecord => {
        const expected = albums.find(album => album.id === albumRecord.id);

        expect(albumRecord).to.deep.equal(expected);
      });
    });
  });

  describe('GET /albums/{id}', () => {
    it('returns the album with the correct id', async () => {
      const { status, body } = await request(app).get(`/albums/${albums[0].id}`).send();

      expect(status).to.equal(200);
      expect(body).to.deep.equal(albums[0]);
    });

    it('returns a 404 if the artist does not exist', async () => {
      const { status, body } = await request(app).get('/albums/999999999').send();

      expect(status).to.equal(404);
      expect(body.message).to.equal('album 999999999 does not exist');
    });
  });
});