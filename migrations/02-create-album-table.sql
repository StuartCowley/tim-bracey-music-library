CREATE TABLE Albums(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  year INT NOT NULL,
  artist_id INT REFERENCES Artists(id)
);