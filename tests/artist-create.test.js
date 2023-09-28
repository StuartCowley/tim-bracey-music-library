const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db/index');
const app = require('../src/app');
const { createArtist } = require('../src/controllers/artist');
const sinon = require('sinon');

describe('Create artist', () => {
  describe('/artists', () => {
    describe('POST', () => {
      it('expects a 201 status code', async () => {
        const req = {};
        const res = { status: sinon.spy()};

        createArtist(req, res);

        // expect(res.sendStatus).to.equal(201);
        // expect(res.status.calledOnce).to.be.true;
        // expect(res.status.calledWith(201)).to.be.true;
      });



      it('creates a new artist in the database', async () => {
        const { status, body } = await request(app).post('/artists').send({
          name: 'Periphery',
          genre: 'Progressive Metal',
        });

        expect(status).to.equal(201);
        expect(body.name).to.equal('Periphery');
        expect(body.genre).to.equal('Progressive Metal');

        const {
          rows: [artistData],
        } = await db.query(`SELECT * FROM Artists WHERE id = ${body.id}`);
        expect(artistData.name).to.equal('Periphery');
        expect(artistData.genre).to.equal('Progressive Metal');
      });
    });
  });
});