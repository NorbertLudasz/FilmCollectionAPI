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
  constructor(cimin, evin, leirasin, zsanerin, boritokepin) {
    this.cim = cimin;
    this.ev = evin;
    this.leiras = leirasin;
    this.zsaner = zsanerin;
    this.boritokep = boritokepin;
  }
}

router.use(bodyparser());

router.post('/submitFilms', upload.single('boritokep'), async (req, res) => {
  try {
    const cimin = req.body.cim;
    const evin = req.body.ev;
    const leirasin = req.body.leiras;
    const zsanerin = req.body.zsaner;

    if (!validation.existcheck(cimin, evin, leirasin, zsanerin)) {
      res.status(500).render('error', { message: 'filmsInsertValid unsuccessful: Missing Input' });
      return;
    }
    if (!validation.uplofilmsearchinputcheck(cimin, evin, leirasin, zsanerin)) {
      res.status(500).render('error', { message: 'filmsInsertValid unsuccessful: Wrong Input' });
      return;
    }

    // console.log('insert elott');
    const ujfilms = new Film(cimin, evin, leirasin, zsanerin, `${req.file.filename}`);

    console.log(ujfilms);
    await db.insertfilms(ujfilms);
    console.log('insert utan');
    const respLog = 'Feltoltes erkezett:';
    console.log(respLog);
    res.redirect('/');
  } catch (err) {
    res.status(500).render('error', { message: `filmsInsertion unsuccessful: ${err.message}` });
  }
});

router.get('/inserteles', (req, res) => {
  try {
    const filmsZsanerek = ['Mystery', 'Romance', 'Action', 'Drama', 'Psychological'];
    if (res.locals.role === 'admin') {
      res.render('inserteles', { filmsZsanerek });
    } else {
      res.status(500).render('error', { message: 'Display of users unsuccessful: no permission to view' });
    }
  } catch (err) {
    res.status(500).render('error', { message: `InsertMegjelenites unsuccessful: ${err.message}` });
  }
});

export default router;
