const db = require('../db/index');

const getAllAlbums = async (req, res) => {

  try {
    const { rows } = await db.query('SELECT * FROM Albums');

    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

const getAlbumById = async (req, res) => {
  try {
    const { rows: [ album ] } = await db.query('SELECT * FROM Albums WHERE id = $1', [req.params.id]);

    if(!album) {
      res.status(404).json({ message: `album ${req.params.id} does not exist` });
    }

    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

const updateAlbum = async (req, res) => {
  const { id } = req.params;
  const { name, year, artist_id } = req.body;

  let query, params;

  if (name && year && artist_id) {
    query = 'UPDATE Albums SET name = $1, year = $2, artist_id = $3 WHERE id = $4 RETURNING *';
    params = [name, year, artist_id, id];
  } else if (name && year) {
    query = 'UPDATE Albums SET name = $1, year = $2 WHERE id = $3 RETURNING *';
    params = [name, year, id];
  } else if (name && artist_id) {
    query = 'UPDATE Albums SET name = $1, artist_id = $2 WHERE id = $3 RETURNING *';
    params = [name, artist_id, id];
  } else if (name) {
    query = 'UPDATE Albums SET name = $1 WHERE id = $2 RETURNING *';
    params = [name, id];
  } else if (year && artist_id) {
    query = 'UPDATE Albums SET year = $1, artist_id = $2 WHERE id = $3 RETURNING *';
    params = [year, artist_id, id];
  } else if (year) {
    query = 'UPDATE Albums SET year = $1 WHERE id = $2 RETURNING *';
    params = [year, id];
  } else if (artist_id) {
    query = 'UPDATE Albums SET artist_id = $1 WHERE id = $2 RETURNING *';
    params = [ artist_id, id];
  }

  try {
    const { rows: [ album ] } = await db.query(query, params);

    if(!album) {
      return res.status(404).json({ message: `album ${id} does not exist` });
    }

    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }

}

const deleteAlbum = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows: [ album ] } = await db.query('DELETE FROM Albums WHERE id = $1 RETURNING *', [id]);

    if(!album) {
      res.status(404).json({ message: `album ${id} does not exist` });
    }

    res.status(200).json(album);

  } catch (err) {
    res.status(500).json(err.message);
  }
}

module.exports = { getAllAlbums, getAlbumById, updateAlbum, deleteAlbum }