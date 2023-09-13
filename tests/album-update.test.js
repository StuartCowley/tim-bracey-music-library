const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('Update Album', () => {
  let artist, album;

  beforeEach(async () => {
    const { rows } = await db.query('INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *', [
      'Periphery',
      'Progressive Metal',
    ]);

    artist = rows[0];

    const { rows: albumRows } = await db.query('INSERT INTO Albums (name, year, artist_id) VALUES ($1, $2, $3) RETURNING *', [
      'Periphery V: Djent is not a Genre',
      2023,
      artist.id,
    ]);

    album = albumRows[0];
  });

  describe('PATCH /albums/{id}', () => {
    it('updates the album and returns the updated record', async () => {
      const { status, body } = await request(app).patch(`/albums/${album.id}`).send({ name: 'Periphery IV: Hail Stan', year: 2019 });

      expect(status).to.equal(200);

      expect(body).to.deep.equal({ id: album.id, name: 'Periphery IV: Hail Stan', year: 2019, artist_id: artist.id });
    });

    it('returns a 404 if the album does not exist', async () => {
      const { status, body } = await request(app).patch('/albums/999999999').send({ name: 'Periphery IV: Hail Stan', year: 2019 });

      expect(status).to.equal(404);
      expect(body.message).to.equal('album 999999999 does not exist');
    });
  });
});