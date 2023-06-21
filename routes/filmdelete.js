import * as dbfilms from '../db/filmsQuery.js';
import router from './mainrouter.js';

router.delete('/filmDel/:id', async (req, res) => {
  try {
    const filmid = req.params.id;
    console.log('delete hehe', filmid);
    await dbfilms.deletefilmsByID(filmid);
    console.log('after film delete');
    res.status(204);
    res.end();
  } catch (err) {
    console.log(err);
    res.status(500);
    res.end();
  }
});

export default router;
