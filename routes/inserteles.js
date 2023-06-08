import * as db from '../db/filmsQuery.js';
import * as validation from '../middleware/validation.js';
import router from './mainrouter.js';

class Film {
  constructor(cimin, evin, leirasin, zsanerin, boritokepin) {
    this.cim = cimin;
    this.ev = evin;
    this.leiras = leirasin;
    this.zsaner = zsanerin;
    this.boritokep = boritokepin;
  }
}

router.post('/submitFilms', async (req, res) => {
  try {
    const cimin = req.fields.cim;
    const evin = req.fields.ev;
    const leirasin = req.fields.leiras;
    const zsanerin = req.fields.zsaner;
    const boritokepin = req.fields.boritokep;
    console.log(cimin, evin, leirasin, zsanerin, boritokepin);

    if (!validation.existcheck(cimin, evin, leirasin, zsanerin)) {
      res.status(500).render('error', { message: 'filmsInsertValid unsuccessful: Missing Input' });
      return;
    }
    if (!validation.uplofilmsearchinputcheck(cimin, evin, leirasin, zsanerin)) {
      res.status(500).render('error', { message: 'filmsInsertValid unsuccessful: Wrong Input' });
      return;
    }

    const ujfilms = new Film(cimin, evin, leirasin, zsanerin, boritokepin);
    console.log(ujfilms);
    // console.log('insert elott');
    await db.insertfilms(ujfilms);
    console.log('insert utan');
    res.redirect('/');
  } catch (err) {
    res.status(500).render('error', { message: `filmsInsertion unsuccessful: ${err.message}` });
  }
});

router.get('/inserteles', (req, res) => {
  try {
    const filmsZsanerek = ['Mystery', 'Romance', 'Action', 'Drama', 'Psychological'];
    res.render('inserteles', { filmsZsanerek });
  } catch (err) {
    res.status(500).render('error', { message: `InsertMegjelenites unsuccessful: ${err.message}` });
  }
});

export default router;
