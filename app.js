const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
require('dotenv').config();

const auth = require('./routes/auth');


var apartmentRouter = require('./routes/apartment-routes');


mongoose
  .connect(process.env.MONGODB_URI, {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
  })
  .then((x) => {
    console.log(`Connected to database "${x.connections[0].name}"`);
  })
  .catch(error => {
    console.error(error);
  });

const app = express();

app.use(
  cors({
    credentials: true,
    origin: [process.env.PUBLIC_DOMAIN,'http://localhost:3000','https://mockupfortheflatsearch.herokuapp.com/'],
  }),
);

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

app.use(
  session({
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60, // 1 day
    }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES MIDDLEWARE:
app.use('/auth', auth);
app.use('/api', apartmentRouter);

//REACT APP index.html
app.use((req,res,next)=>{
  //If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/public/index.html");
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({ code: 'not found' });
});

app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    const statusError = err.status || '500';
    res.status(statusError).json(err);
  }
});

module.exports = app;
