import dbConnection from './connection.js';

export const findSearchFilms = (req) => {
  console.log('findsearchfilmsbeli parameterek:');
  console.log(req.body.cimsearch, req.body.zsanersearch, req.body.evminsearch, req.body.evmaxsearch);
  return dbConnection.executeQuery(
    `SELECT * FROM films WHERE films.cim LIKE 
    ? AND films.zsaner LIKE ? AND films.ev > ? AND films.ev < ?`,
    [req.body.cimsearch, req.body.zsanersearch, req.body.evminsearch, req.body.evmaxsearch],
  );
};

export const findAllfilms = () => {
  const query = 'SELECT * FROM films';
  return dbConnection.executeQuery(query);
};

export const findfilmsByID = (req) => {
  console.log('findfilmbyid');
  return dbConnection.executeQuery('SELECT * FROM films WHERE films.id = ?', req);
};

export const deletefilmsByID = (req) => {
  console.log('deletefilmbyid', req);
  return dbConnection.executeQuery('DELETE FROM films WHERE films.id = ?', req);
};

export const updatefilmsByID = (req) => {
  console.log('updatefilmbyid', req);
  return dbConnection.executeQuery(
    'UPDATE films SET cim = ?, ev = ?, leiras = ?, zsaner = ?, boritokep = ? WHERE id = ?',
    [req.cim, req.ev, req.leiras, req.zsaner, req.boritokep, req.id],
  );
};

export const findAllCim = () => {
  const query = 'SELECT DISTINCT films.cim FROM films';
  return dbConnection.executeQuery(query);
};

export const findAllZsaner = () => {
  const query = 'SELECT DISTINCT films.zsaner FROM films';
  return dbConnection.executeQuery(query);
};

export const insertfilms = (req) => {
  console.log('insertfilms');
  return dbConnection.executeQuery('INSERT INTO films (cim, ev, leiras, zsaner, boritokep) VALUES (?, ?, ?, ?, ?)', [
    req.cim,
    req.ev,
    req.leiras,
    req.zsaner,
    req.boritokep,
  ]);
};

export const deleteAllfilms = () => {
  const query = 'DELETE FROM films';
  return dbConnection.executeQuery(query);
};
