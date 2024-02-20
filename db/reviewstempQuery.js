import dbConnection from './connection.js';

export const findAllreviewstemp = () => {
  const query = 'SELECT * FROM reviewstemp';
  return dbConnection.executeQuery(query);
};

export const findAllreviewstempByID = (id) => {
  console.log('findallreviewstempbyid');
  return dbConnection.executeQuery('SELECT * FROM reviewstemp WHERE reviewstemp.filmid = ?', id);
};

export const findAllreviewstempByNev = (nev) => {
  console.log('findallreviewstempbynev');
  return dbConnection.executeQuery('SELECT * FROM reviewstemp WHERE reviewstemp.felhnev = ?', nev);
};

export const findReviewtempByID = (req) => {
  console.log('findreviewbyid');
  return dbConnection.executeQuery('SELECT * FROM reviewstemp WHERE reviewstemp.id = ?', req);
};

export const findAllreviewstempByStatus = (status) => {
  console.log('findAllreviewstempPending');
  return dbConnection.executeQuery('SELECT * FROM reviewstemp WHERE reviewstemp.status = ?', status);
};

export const insertreviewstemp = (rwtext, rate, filmnum, felhnev, status) => {
  console.log(rwtext, rate, filmnum, felhnev, status);
  return dbConnection.executeQuery(
    'INSERT INTO reviewstemp (reviewstext, rating, filmid, felhnev, status) VALUES (?, ?, ?, ?, ?)',
    [rwtext, rate, filmnum, felhnev, status],
  );
};

export const deleteAllreviewstemp = () => {
  const query = 'DELETE FROM reviewstemp';
  return dbConnection.executeQuery(query);
};

export const deletereviewstempById = (id) => {
  console.log('reviewstempDelete');
  return dbConnection.executeQuery('DELETE FROM reviewstemp WHERE reviewstemp.id = ?', id);
};

export const updatereviewsByID = (id, rwtext, rate) => {
  console.log('updatereviewbyid');
  return dbConnection.executeQuery('UPDATE reviewstemp SET reviewstext = ?, rating = ?,  WHERE id = ?', [
    rwtext,
    rate,
    id,
  ]);
};
