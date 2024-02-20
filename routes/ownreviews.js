import * as dbreviews from '../db/reviewsQuery.js';
import * as dbreviewstemp from '../db/reviewstempQuery.js';
import router from './mainrouter.js';

router.get('/ownreviews', async (req, res) => {
  try {
    const recievedName = res.locals.nev;
    // const recievedName = req.params.nev;
    const reviews = await dbreviews.findAllreviewsByNev(recievedName);
    const reviewstemp = await dbreviewstemp.findAllreviewstempByNev(recievedName);
    console.log('reviews', reviews);
    console.log('reviewstemp', reviewstemp);
    res.render('ownreviews', { reviews, reviewstemp });
  } catch (err) {
    console.log(err);
    res.status(500).render('error', { message: 'ownreviews get unsuccessful' });
  }
});

export default router;
