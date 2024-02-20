import * as bcrypt from 'bcrypt';
import { Router } from 'express';
import bodyParser from 'body-parser';
import * as db from '../db/felhasznaloQuery.js';
import * as validation from '../middleware/validation.js';

const router = new Router();
router.use(bodyParser.urlencoded());

class Person {
  constructor(nevin, jelszoin, szerepin, saltin) {
    this.nev = nevin;
    this.jelszo = jelszoin;
    this.szerep = szerepin;
    this.salt = saltin;
  }
}

router.post('/registerUser', async (req, res) => {
  try {
    console.log('hello', req.body);
    const nevin = req.body.nev;
    const jelszoin = req.body.jelszo;
    const szerepin = req.body.szerep;
    console.log(nevin, jelszoin, szerepin);

    if (!validation.usercheckReg(nevin, szerepin)) {
      res.status(500).render('error', { message: 'RegisterUser unsuccessful: Wrong Input' });
      return;
    }

    const userID = await db.findFelhasznaloByNev(nevin);
    console.log(userID.length);
    if (userID.length) {
      res.status(500).render('error', { message: 'RegisterUser unsuccessful: Username already taken' });
      return;
    }

    const salt = 10;
    console.log('salt and pass');
    console.log(salt, jelszoin);
    const hashJelszo = await bcrypt.hash(jelszoin, salt);
    console.log('after bcrypt hash');
    console.log(salt, hashJelszo);
    const ujUser = new Person(nevin, hashJelszo, szerepin, salt);
    // console.log('insert elott');
    await db.insertFelhasznalo(ujUser);
    console.log('insert utan');
    res.redirect('/');
  } catch (err) {
    res.status(500).render('error', { message: 'registerUser unsuccessful', err });
  }
});

router.get('/register', (req, res) => {
  try {
    res.render('register', {});
  } catch (err) {
    res.status(500).render('error', { message: `RegisterMegjelenites unsuccessful: ${err.message}` });
  }
});
export default router;
