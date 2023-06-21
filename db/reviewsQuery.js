import dbConnection from './connection.js';

export const findAllreviews = () => {
  const query = 'SELECT * FROM reviews';
  return dbConnection.executeQuery(query);
};

export const findAllreviewsByID = (id) => {
  console.log('findallreviewsbyid');
  return dbConnection.executeQuery('SELECT * FROM reviews WHERE reviews.filmid = ?', id);
};

export const findReviewByID = (req) => {
  console.log('findreviewbyid');
  return dbConnection.executeQuery('SELECT * FROM reviews WHERE reviews.id = ?', req);
};

export const findAllreviewsByNev = (req) => {
  console.log('findAllreviewsByNev');
  return dbConnection.executeQuery('SELECT * FROM reviews WHERE reviews.felhnev = ?', req);
};

export const insertreviews = (rwtext, rate, filmnum, felhnev) => {
  console.log(rwtext, rate, filmnum);
  return dbConnection.executeQuery('INSERT INTO reviews (reviewstext, rating, filmid, felhnev) VALUES (?, ?, ?, ?)', [
    rwtext,
    rate,
    filmnum,
    felhnev,
  ]);
};

export const deleteAllreviews = () => {
  const query = 'DELETE FROM reviews';
  return dbConnection.executeQuery(query);
};

export const deletereviewsById = (id) => {
  console.log('reviewsDelete');
  return dbConnection.executeQuery('DELETE FROM reviews WHERE reviews.id = ?', id);
};

export const updatereviewsByID = (id, rwtext, rate) => {
  console.log('updatereviewbyid');
  return dbConnection.executeQuery('UPDATE reviews SET reviewstext = ?, rating = ?,  WHERE id = ?', [rwtext, rate, id]);
};
