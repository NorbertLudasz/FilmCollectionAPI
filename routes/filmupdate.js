import multer from 'multer';
import bodyparser from 'body-parser';
import * as db from '../db/filmsQuery.js';
import * as validation from '../middleware/validation.js';
import router from './mainrouter.js';

const stor = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploadDir');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: stor });

class Film {
  constructor(cimin, evin, leirasin, zsanerin, boritokepin, idin) {
    this.id = idin;
    this.cim = cimin;
    this.ev = evin;
    this.leiras = leirasin;
    this.zsaner = zsanerin;
    this.boritokep = boritokepin;
  }
}

router.use(bodyparser());

router.post('/updateFilms/:id', upload.single('boritokep'), async (req, res) => {
  try {
    const idin = req.params.id;
    console.log('updatefilms req body');
    console.log(req.body);
    const cimin = req.body.cim;
    const evin = req.body.ev;
    const leirasin = req.body.leiras;
    const zsanerin = req.body.zsaner;

    // ha a res.locals.nev megegyezik a film feltoltojevel
    if (!validation.existcheck(cimin, evin, leirasin, zsanerin)) {
      res.status(500).render('error', { message: 'filmsUpdateValid unsuccessful: Missing Input' });
      return;
    }
    if (!validation.uplofilmsearchinputcheck(cimin, evin, leirasin, zsanerin)) {
      res.status(500).render('error', { message: 'filmsUpdateValid unsuccessful: Wrong Input' });
      return;
    }

    // console.log('insert elott');
    const ujfilms = new Film(cimin, evin, leirasin, zsanerin, `${req.file.filename}`, idin);

    console.log(ujfilms);
    await db.updatefilmsByID(ujfilms);
    // await db.insertfilms(ujfilms);
    console.log('film update utan');
    res.redirect('/');
  } catch (err) {
    res.status(500).render('error', { message: `filmsUpdate unsuccessful: ${err.message}` });
  }
});

router.get('/updatefilm/:id', (req, res) => {
  try {
    const filmsZsanerek = ['Mystery', 'Romance', 'Action', 'Drama', 'Psychological'];
    res.render('filmupdate', { filmsZsanerek, id: req.params.id });
  } catch (err) {
    res.status(500).render('error', { message: `UpdateFilm unsuccessful: ${err.message}` });
  }
});

export default router;
