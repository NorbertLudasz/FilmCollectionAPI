import express from 'express';
import morgan from 'morgan';
import eformidable from 'express-formidable';
import { existsSync, mkdirSync } from 'fs';
import * as p from 'path';
// import cookieParser from 'cookie-parser';

import errorMiddleware from './middleware/error.js';
import requestRoutes from './routes/mainrouter.js';
import requestRoutesInsert from './routes/inserteles.js';
import requestRoutesreviewspage from './routes/reviewspage.js';
import requestRoutesfilmsbyid from './routes/filmsbyid.js';
import requestRoutesMessage from './routes/message.js';
// import requestRoutesReviewdel from './routes/reviewdel.js';
// import requestRoutesRegister from './routes/register.js';
// import requestRoutesLogin from './routes/login.js';
import { createTable } from './db/createtableinit.js';
// import logincheck from './middleware/loginchecker.js';

const uploadDir = p.join(process.cwd(), 'static/uploadDir');
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir);
}

const app = express();

app.use(eformidable({ uploadDir, multiples: true }));
// app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', p.join(process.cwd(), 'views'));

app.use(morgan('tiny'));

// app.use(logincheck);
app.use('/', requestRoutes);
app.use('/inserteles', requestRoutesInsert);
app.use('/reviewspage', requestRoutesreviewspage);
app.use('/filmsbysid', requestRoutesfilmsbyid);
app.use('/message', requestRoutesMessage);
// app.use('/reviewdel', requestRoutesReviewdel);
// app.use('/register', requestRoutesRegister);
// app.use('/login', requestRoutesLogin);
app.use(express.static(p.join(process.cwd(), 'static')));

app.use(errorMiddleware);

createTable().then(() => {
  app.listen(8080, () => {
    console.log('Server listening on http://localhost:8080/ ...');
  });
});
