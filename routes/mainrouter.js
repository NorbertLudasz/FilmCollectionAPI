// Moduláris express router létrehozása

import express from 'express';
import bodyparser from 'body-parser';
import * as db from '../db/filmsQuery.js';
import * as validation from '../middleware/validation.js';

const router = express.Router();
// router.use(bodyparser.urlencoded({ extended: false }));
// router.use(bodyparser.json());

router.get(['/', '/index'], async (req, res) => {
  try {
    const filmek = await db.findAllfilms();
    console.log(filmek);
    res.render('filmek', { filmek });
    console.log('rendered filmek');
  } catch (err) {
    res.status(500).render('error', { message: `Selection unsuccessful: ${err.message}` });
  }
});

router.post('/delete', async (req, res) => {
  try {
    console.log('bementem a deletebe');
    await db.deleteAllfilms();
    res.render('filmek', { films: [] });
  } catch (err) {
    res.status(500).render('error', { message: `Deletion unsuccessful: ${err.message}` });
  }
});
router.use(bodyparser.urlencoded());
router.post('/searchFilms', async (request, response) => {
  try {
    const cim = request.body.cimsearch;
    const evmin = request.body.evminsearch;
    const evmax = request.body.evmaxsearch;
    const zsaner = request.body.zsanersearch;
    console.log('searchfilms req body', request.body);

    if (!validation.existcheckSearch(cim, zsaner, evmin, evmax)) {
      response.status(500).render('error', { message: 'Searchfilms unsuccessful: Missing Input' });
      return;
    }

    if (!validation.searchinputcheck(cim, zsaner, evmin, evmax)) {
      response.status(500).render('error', { message: 'Searchfilms unsuccessful: Wrong Input' });
      return;
    }
    const filmek = await db.findSearchFilms(request);
    response.render('filmek', { filmek });
  } catch (err) {
    response.status(500).render('error', { message: `Searchfilms unsuccessful: ${err.message}` });
  }
});

router.get('/message/:id', async (req, res) => {
  try {
    const filmsID = req.params.id;
    const filmsSor = await db.findfilmsByID(filmsID);
    console.log(filmsSor);
    res.send(JSON.stringify(filmsSor[0]));
    res.end();
  } catch (err) {
    res.status(500).send(JSON.stringify('hiba'));
    res.end();
  }
});

export default router;
