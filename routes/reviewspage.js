import bodyparser from 'body-parser';
import * as db from '../db/filmsQuery.js';
import * as dbreviews from '../db/reviewsQuery.js';
import * as dbfelhasznalo from '../db/felhasznaloQuery.js';
import * as dbreviewstemp from '../db/reviewstempQuery.js';
import router from './mainrouter.js';

router.use(bodyparser());
router.use(bodyparser.urlencoded());

router.post('/uploadReview', async (req, res) => {
  console.log(req.body.feltoltesid, req.body, req.headers);
  try {
    const rating = req.body.feltoltesrating;
    const leiras = req.body.feltoltesleiras;
    const filmid = parseInt(req.body.feltoltesid, 10);
    const felhnev = res.locals.nev;

    const rgx = String(filmid).match(/[0-9]*/);
    if (!rgx) {
      res.status(500).render('error', { message: 'ReviewValidation unsuccessful: Wrong Input' });
      return;
    }

    const filmek = await db.findfilmsByID(filmid);
    console.log(filmek, rating, leiras, filmid, felhnev);

    await dbreviews.insertreviews(leiras, rating, filmid, felhnev);
    const reviews = await dbreviews.findAllreviewsByID(filmid);
    const felhobj = await dbfelhasznalo.findFelhasznaloNevOnly();
    const felhasznalok = felhobj.map(({ nev }) => nev);

    res.render('reviews', { filmek, reviews, felhasznalok });
  } catch (err) {
    console.log(err);
    res.status(500);
    res.end();
  }
});

router.post('/uploadReviewtemp', async (req, res) => {
  console.log(req.body.feltoltesid, req.body, req.headers);
  try {
    const rating = req.body.feltoltesrating;
    const leiras = req.body.feltoltesleiras;
    const filmid = parseInt(req.body.feltoltesid, 10);
    const felhnev = res.locals.nev;
    const status = 'pending';

    const rgx = String(filmid).match(/[0-9]*/);
    if (!rgx) {
      res.status(500).render('error', { message: 'ReviewValidation unsuccessful: Wrong Input' });
      return;
    }

    const filmek = await db.findfilmsByID(filmid);
    console.log(filmek, rating, leiras, filmid, felhnev, status);

    await dbreviewstemp.insertreviewstemp(leiras, rating, filmid, felhnev, status);
    // const reviews = await dbreviewstemp.findAllreviewstempByID(filmid);
    const reviews = await dbreviews.findAllreviewsByID(filmid);
    const felhobj = await dbfelhasznalo.findFelhasznaloNevOnly();
    const felhasznalok = felhobj.map(({ nev }) => nev);

    res.render('reviews', { filmek, reviews, felhasznalok });
  } catch (err) {
    console.log(err);
    res.status(500);
    res.end();
  }
});

router.delete('/reviewDel/:id', async (req, res) => {
  try {
    const reviewid = req.params.id;
    console.log(reviewid);
    await dbreviews.deletereviewsById(reviewid);
    console.log('after delete');
    res.status(204);
    res.end();
  } catch (err) {
    res.status(500);
    res.end();
  }
});

router.delete('/reviewtempDel/:id', async (req, res) => {
  try {
    const reviewid = req.params.id;
    console.log(reviewid);
    await dbreviewstemp.deletereviewstempById(reviewid);
    console.log('after reviewtemp delete');
    res.status(204);
    res.end();
  } catch (err) {
    res.status(500);
    res.end();
  }
});

export default router;
