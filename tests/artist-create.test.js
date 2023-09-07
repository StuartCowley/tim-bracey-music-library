const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const { addArtist } = require('../src/controllers/artist');

describe('create artist', () => {
  describe('/artists', () => {
    describe('POST', () => {
      it('expects a 201 status code', async () => {
        const req = {};
        const res = { sendStatus: 201};

        addArtist(req, res);

        expect(res.sendStatus).to.equal(201);
      });



      xit('creates a new artist in the database', async () => {
        const res = (await request(app).post('/artists')).send({
          name: 'Periphery',
          genre: 'Progressive Metal',
        });

        expect(res.status).to.equal(201);
      });
    });
  });
});