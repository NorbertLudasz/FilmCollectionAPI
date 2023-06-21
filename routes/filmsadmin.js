import bodyparser from 'body-parser';
import * as db from '../db/filmsQuery.js';
import * as validation from '../middleware/validation.js';

import router from './mainrouter.js';

router.get(['/filmekadmin'], async (req, res) => {
  try {
    const filmek = await db.findAllfilms();
    console.log(filmek);
    res.render('filmekadmin', { filmek });
    console.log('rendered filmekadmin');
  } catch (err) {
    res.status(500).render('error', { message: `Selection unsuccessful: ${err.message}` });
  }
});

router.use(bodyparser.urlencoded());
router.post('/searchFilmsAdmin', async (request, response) => {
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
    response.render('filmekadmin', { filmek });
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
