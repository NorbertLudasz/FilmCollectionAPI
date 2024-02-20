import * as db from '../db/felhasznaloQuery.js';

import router from './mainrouter.js';

router.get('/setadmin/:id', async (req, res) => {
  try {
    const userID = req.params.id;
    const role = 'admin';
    await db.updateFelhasznaloRoleByID(userID, role);
    const userSor = await db.findFelhasznaloByID(userID);

    res.send(userSor[0]);
    res.end();
  } catch (err) {
    console.log(err);
    res.status(500).send(JSON.stringify('hiba'));
    res.end();
  }
});

router.get('/setnotadmin/:id', async (req, res) => {
  try {
    const userID = req.params.id;
    const role = 'user';
    await db.updateFelhasznaloRoleByID(userID, role);
    const userSor = await db.findFelhasznaloByID(userID);

    res.send(userSor[0]);
    res.end();
  } catch (err) {
    res.status(500).send(JSON.stringify('hiba'));
    res.end();
  }
});

export default router;
