import * as db from '../db/filmsQuery.js';
import * as dbreviews from '../db/reviewsQuery.js';
import * as dbfelhasznalo from '../db/felhasznaloQuery.js';
import router from './mainrouter.js';

router.get('/films/:id', async (req, res) => {
  try {
    const recievedId = req.params.id;
    // console.log(recievedId);
    const filmek = await db.findfilmsByID(recievedId);
    const reviews = await dbreviews.findAllreviewsByID(recievedId);
    const felhobj = await dbfelhasznalo.findFelhasznaloNevOnly();
    const felhasznalok = felhobj.map(({ nev }) => nev);
    console.log('felhasznalok', felhasznalok);
    res.render('reviews', { filmek, reviews, felhasznalok });
  } catch (err) {
    res.status(500).render('error', { message: 'Review Upload By ID unsuccessful' });
  }
});

export default router;
