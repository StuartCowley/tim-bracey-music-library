const db = require('../db/index.js');

const createArtist = async (req, res) => {

  const { name, genre } = req.body;

  try {
    const { rows: [ artist ] } = await db.query(`INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *`, [name, genre]);
    res.status(201).json(artist);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getAllArtists = async (req, res) => {

  try {
    const { rows } = await db.query(`SELECT * FROM Artists`);

    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

const getArtistById = async (req, res) => {
  try {
    const { rows: [ artist ] } = await db.query('SELECT * FROM Artists WHERE id = $1', [req.params.id]);

    if(!artist) {
     res.status(404).json({ message: `artist ${req.params.id} does not exist` });
    }

    res.status(200).json(artist);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

// MY DIRTY WAY

// const updateArtist = async (req, res) => {
//   try {
//     if(req.body.name && req.body.genre) {

//       const { rows: [ artist ] } = await db.query('UPDATE Artists SET name = $1, genre = $2 WHERE id = $3 RETURNING *', [req.body.name, req.body.genre, req.params.id]);

//       if(!artist) {
//         res.status(404).json({ message: `artist ${req.params.id} does not exist` });
//       }
//       res.status(200).json(artist);
//     } else if(req.body.name && !req.body.genre) {

//       const { rows: [ artist ] } = await db.query('UPDATE Artists SET name = $1 WHERE id = $2 RETURNING *', [req.body.name, req.params.id]);
//       if(!artist) {
//         res.status(404).json({ message: `artist ${req.params.id} does not exist` });
//       }
//       res.status(200).json(artist);
//     } else if(req.body.genre && !req.body.name) {

//       const { rows: [ artist ] } = await db.query('UPDATE Artists SET genre = $1 WHERE id = $2 RETURNING *', [req.body.genre, req.params.id]);
//       if(!artist) {
//         res.status(404).json({ message: `artist ${req.params.id} does not exist` });
//       }
//       res.status(200).json(artist);
//     }
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// }


// Clean way
const updateArtist = async (req, res) => {
  const { id } = req.params;
  const { name, genre } = req.body;

  let query, params;

  if (name && genre) {
    query = 'UPDATE Artists SET name = $1, genre = $2 WHERE id = $3 RETURNING *';
    params = [name, genre, id];
  } else if (name) {
    query = 'UPDATE Artists SET name = $1 WHERE id = $2 RETURNING *';
    params = [name, id];
  } else if (genre) {
    query = 'UPDATE Artists SET genre = $1 WHERE id = $2 RETURNING *';
    params = [ genre, id];
  }

  try {
    const { rows: [ artist ] } = await db.query(query, params);
    // console.log(artist);

    if(!artist) {
      return res.status(404).json({ message: `artist ${id} does not exist` });
    }

    res.status(200).json(artist);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

const deleteArtist = async (req, res) => {
  const { id } = req.params;

  const { rows : [ artist ] } = await db.query('DELETE FROM Artists WHERE id = $1 RETURNING *', [id]);

  if(!artist) {
    return res.status(404).json({ message: `artist ${id} does not exist` });
  }

  res.status(200).json(artist);
}

const createAlbum = async (req, res) => {
  const { id: artist_id } = req.params;
  const { name, year, } = req.body;

  // console.log(name);
  // console.log(year);
  // console.log(artist_id)

  try {
    const { rows: [ album ] } = await db.query('INSERT INTO Albums (name, year, artist_id) VALUES ($1, $2, $3) RETURNING *', [
      name, year, artist_id
    ]);
    res.status(201).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

module.exports = { createArtist, getAllArtists, getArtistById, updateArtist, deleteArtist, createAlbum }