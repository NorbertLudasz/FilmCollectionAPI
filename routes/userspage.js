import bodyparser from 'body-parser';
import router from './mainrouter.js';
import * as db from '../db/felhasznaloQuery.js';

router.use(bodyparser.urlencoded());
router.post('/searchUsers', async (request, response) => {
  try {
    const nev = request.body.nevsearch;
    console.log('searchusers req body', request.body);

    if (!nev.match(/[A-Za-z]*/)) {
      response.status(500).render('error', { message: 'Searchusers unsuccessful: Wrong Input' });
      return;
    }

    const users = await db.findFelhasznaloByNev(nev);
    response.render('userspage', { users });
  } catch (err) {
    response.status(500).render('error', { message: `Searchfilms unsuccessful: ${err.message}` });
  }
});

router.get('/userspage', async (req, res) => {
  try {
    const users = await db.findAllFelhasznalo();
    if (res.locals.role === 'admin') {
      res.render('userspage', { users });
    } else {
      res.status(500).render('error', { message: 'Display of users unsuccessful: no permission to view' });
    }
  } catch (err) {
    res.status(500).render('error', { message: `Display of users unsuccessful: ${err.message}` });
  }
});

export default router;
