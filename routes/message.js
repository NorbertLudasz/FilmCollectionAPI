import * as db from '../db/filmsQuery.js';

import router from './mainrouter.js';

router.get('/message/:id', async (req, res) => {
  try {
    const filmsID = req.params.id;
    const filmsSor = await db.findfilmsByID(filmsID);
    console.log('messagejs filmssor', filmsSor);
    // res.send(JSON.stringify(filmsSor[0]));
    res.send(filmsSor[0]);
    res.end();
  } catch (err) {
    res.status(500).send(JSON.stringify('hiba'));
    res.end();
  }
});

export default router;
