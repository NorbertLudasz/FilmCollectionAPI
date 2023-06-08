import * as db from '../db/filmsQuery.js';
import * as dbreviews from '../db/reviewsQuery.js';
import * as dbfelhasznalo from '../db/felhasznaloQuery.js';

import router from './mainrouter.js';

router.post('/uploadReview', async (request, response) => {
  try {
    const rating = request.fields.feltoltesrating;
    const leiras = request.fields.feltoltesleiras;
    const filmid = parseInt(request.fields.feltoltesid, 10);
    const felhnev = request.fields.feltoltesfelh;

    const rgx = String(filmid).match(/[0-9]*/);
    if (!rgx) {
      response.status(500).render('error', { message: 'ReviewValidation unsuccessful: Wrong Input' });
      return;
    }

    const filmek = await db.findfilmsByID(filmid);
    console.log(filmek, rating, leiras, filmid, felhnev);

    await dbreviews.insertreviews(leiras, rating, filmid, felhnev);
    const reviews = await dbreviews.findAllreviewsByID(filmid);
    const felhobj = await dbfelhasznalo.findFelhasznaloNevOnly();
    const felhasznalok = felhobj.map(({ nev }) => nev);

    response.render('reviews', { filmek, reviews, felhasznalok });
  } catch (err) {
    response.status(500).render('error', { message: 'Review Upload unsuccessful' });
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
    res.status(500).render('error', { message: 'reviewdel routerget unsuccessful' });
  }
});

export default router;
