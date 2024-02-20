import express from 'express';
import morgan from 'morgan';

// import eformidable from 'express-formidable';
// import { existsSync, mkdirSync } from 'fs';
import * as p from 'path';
import cookieParser from 'cookie-parser';

import errorMiddleware from './middleware/error.js';
import requestRoutes from './routes/mainrouter.js';
import requestRoutesInsert from './routes/inserteles.js';
import requestRoutesreviewspage from './routes/reviewspage.js';
import requestRoutesfilmsbyid from './routes/filmsbyid.js';
import requestRoutesMessage from './routes/message.js';
import requestRoutesUsers from './routes/userspage.js';
import requestRoutesFilmsAdmin from './routes/filmsadmin.js';
import requestRoutesFilmsUpdate from './routes/filmupdate.js';
import requestRoutesFilmsDelete from './routes/filmdelete.js';
import requestRoutesModifyPerms from './routes/modifyperms.js';
import requestRoutesOwnReviews from './routes/ownreviews.js';
import requestRoutesReviewsAdmin from './routes/reviewsadmin.js';

// import requestRoutesReviewdel from './routes/reviewdel.js';
import requestRoutesRegister from './routes/register.js';
import requestRoutesLogin from './routes/login.js';
import requestRoutesLogOut from './routes/logout.js';
import { createTable } from './db/createtableinit.js';
import logincheck from './middleware/loginchecker.js';

// const uploadDir = p.join(process.cwd(), 'public/uploadDir'); // static/uploadDir volt
// if (!existsSync(uploadDir)) {
//   mkdirSync(uploadDir);
// }

const app = express();

// app.use(eformidable({ uploadDir, multiples: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', p.join(process.cwd(), 'views'));

app.use(morgan('tiny'));

app.use('/', requestRoutesRegister);
app.use('/', requestRoutesLogin);
app.use(logincheck);
// app.use('/', requestRoutes);
// app.use('/inserteles', requestRoutesInsert);
// app.use('/reviewspage', requestRoutesreviewspage);
// app.use('/filmsbysid', requestRoutesfilmsbyid);
// app.use('/message', requestRoutesMessage);
// app.use('/reviewdel', requestRoutesReviewdel);

app.use('/', requestRoutes);

app.use('/', requestRoutesInsert);
app.use('/', requestRoutesreviewspage);
app.use('/', requestRoutesfilmsbyid);
app.use('/', requestRoutesMessage);
app.use('/', requestRoutesUsers);
app.use('/', requestRoutesFilmsAdmin);
app.use('/', requestRoutesFilmsUpdate);
app.use('/', requestRoutesFilmsDelete);
app.use('/', requestRoutesModifyPerms);
app.use('/', requestRoutesOwnReviews);
app.use('/', requestRoutesReviewsAdmin);
// app.use('/', requestRoutesReviewdel);

app.use('/logout', requestRoutesLogOut);
app.use(express.static(p.join(process.cwd(), 'public'))); // static volt

app.use(errorMiddleware);

createTable().then(() => {
  app.listen(8080, () => {
    console.log('Server listening on http://localhost:8080/ ...');
  });
});
