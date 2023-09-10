const db = require('../db/index.js');

const createArtist = async (req, res) => {
  // const created = await db.query('INSERT INTO artists (name, genre)', [req.body.name, req.body.genre]);
  // try {
  //   res.status(201).send(created.rows[0]);
  // } catch (err) {
  //   res.sendStatus(500);
  // }

  const { name, genre } = req.body;

  try {
    const { rows: [ artist ] } = await db.query(`INSERT INTO artists (name, genre) VALUES ($1, $2) RETURNING *`, [name, genre]);
    res.status(201).json(artist);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = { createArtist }