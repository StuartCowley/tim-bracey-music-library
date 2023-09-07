const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const { addArtist } = require('../src/controllers/artist');
const sinon = require('sinon');

describe('create artist', () => {
  describe('/artists', () => {
    describe('POST', () => {
      it('expects a 201 status code', async () => {
        const req = {};
        const res = { status: sinon.spy()};

        addArtist(req, res);

        // expect(res.sendStatus).to.equal(201);
        expect(res.status.calledOnce).to.be.true;
        expect(res.status.calledWith(201)).to.be.true;
      });



      it('creates a new artist in the database', async () => {
        const res = await request(app).post('/artists').send({
          name: 'Periphery',
          genre: 'Progressive Metal',
        });

        expect(res.status).to.equal(201);
      });
    });
  });
});