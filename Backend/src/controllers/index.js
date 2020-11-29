const { NotFound } = require('http-errors');
const express = require('express');

const error = require('../middlewares/error');

const auth = require('./auth');
const user = require('./user');
const post = require('./post');
const comment = require('./comment');
const like = require('./post_like');

function setup(app) {
  app.use('/uploads', express.static('uploads'));

  app.use('/auth', auth);

  app.use('/users', user);

  app.use('/posts', post);

  app.use('/posts/:postId', comment);

  app.use('/posts/:postId', like);

  // setup catch-all function for non-existing endpoints
  app.use('*', (req, _res, next) => {
    // just send not found error to error handler
    next(new NotFound(`${req.method} ${req.originalUrl} not found`));
  });

  app.use(error);
}

module.exports = setup;
