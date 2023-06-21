import * as dbreviewstemp from '../db/reviewstempQuery.js';
import router from './mainrouter.js';

router.get('/reviewsadmin', async (req, res) => {
  try {
    const status = 'pending';
    const reviewstemp = await dbreviewstemp.findAllreviewstempByStatus(status);
    res.render('reviewsadmin', { reviewstemp });
  } catch (err) {
    res.status(500).render('error', { message: 'reviewsadmin unsuccessful' });
  }
});

export default router;
