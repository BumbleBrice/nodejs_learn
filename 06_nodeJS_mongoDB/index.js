import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import expressLayout from 'express-ejs-layouts';
import flash from 'connect-flash';
import session from 'express-session';
import connectDB from './server/config/db.js';
import customerRoutes from './server/routes/customer.js';

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
);

app.use(flash({ sessionKeyName: 'flashMessage' }));

app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', customerRoutes);

app.get('*', (req, res) => {
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
