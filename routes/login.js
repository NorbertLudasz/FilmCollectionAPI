import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Router } from 'express';
import bodyParser from 'body-parser';
import * as db from '../db/felhasznaloQuery.js';
import * as validation from '../middleware/validation.js';

import { secret } from '../constants.js';

const router = new Router();

router.use(bodyParser.urlencoded());

router.post('/loginUser', async (req, res) => {
  try {
    console.log(req);
    const nevin = req.body.nev;
    const jelszoin = req.body.jelszo;
    console.log('login req', req.body);

    if (!validation.usercheckLogin(nevin)) {
      res.status(500).render('error', { message: 'Login unsuccessful: Wrong Input' });
      return;
    }

    let hashJelszo = await db.findHashed(nevin);
    console.log('ab-bol hashjelszo', hashJelszo);
    if (!hashJelszo) {
      res.status(500).render('error', { message: 'Login unsuccessful: User with specified data not found' });
      return;
    }

    hashJelszo = hashJelszo[0].jelszo;
    console.log('bcrypt comp elott');
    const legitlogin = await bcrypt.compare(jelszoin, hashJelszo);
    console.log('bcrypt comp utan');
    if (!legitlogin) {
      res.status(500).render('error', { message: 'Login unsuccessful: User with specified data not found' });
      return;
    }

    console.log('Successful Login!');
    // get role of user from db
    const role = await db.findRole(nevin);
    const actualrole = role[0].szerep;
    console.log('role of user: ');
    console.log(actualrole);
    const token = jwt.sign({ nevin, role: actualrole }, secret);
    // const token = jwt.sign({ nevin }, secret);
    res.cookie('cookie1', token, { httpOnly: true, sameSite: 'strict' });
    res.redirect('/');
  } catch (err) {
    res.status(500).render('error', { message: `loginUser unsuccessful: ${err.message}` });
  }
});

router.get('/login', (req, res) => {
  try {
    res.render('login', {});
  } catch (err) {
    res.status(500).render('error', { message: `LoginMegjelenites unsuccessful: ${err.message}` });
  }
});
export default router;
