'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const { Sequelize } = require('sequelize');
const cors = require('cors');

// load router
const router = require('./routes/index');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// enable cors requests
app.use(cors());

// parse json requests
app.use(express.json());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// use router
app.use('/api', router);

// create sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite'
});

// test connection to DB
sequelize.authenticate()
  .then(() => {
    console.log('Connection to database successfull!');
  })
  .catch(err => {
    console.error('Unable to connect to database', err);
});

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// Sequelize model synchronization, then start listening on our port
sequelize.sync()
  .then( () => {
    const server = app.listen(app.get('port'), () => {
      console.log(`Express server is listening on port ${server.address().port}`);
    });
  });

