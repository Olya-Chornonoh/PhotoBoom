const UserService = require('../services/user');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');

const user = new UserService();

const express = require('express');
const {check} = require('express-validator');
const { NotFound } = require('http-errors');

const router = express.Router({mergeParams: true});

function searchUsers(req, res, next) {
  const login = req.query.login;
  const limit = Number(req.query.limit) || 10;
  const offset = Number(req.query.offset) || 0;

  user.search(login, offset, limit).then(result => {
    console.log(result);
    res.status(200).json(result);
  }).catch(err => next(err));
}

function getAuthorizedUser(req, res, next) {
  user.get(req['userId'])
    .then(result => res.status(200).json(result))
    .catch(err => next(err));
}

function getUser(req, res, next) {
  user.get(req.params.id)
    .then(result => {
      if (result) {
        return res.status(200).json(result);
      } else {
        next(NotFound('User not found'));
      }
    })
    .catch(err => next(err));
}

function register(req, res, next) {
  user.create(req.body)
    .then(result => res.status(201).json(result))
    .catch(err => next(err));
}

router.get('/', searchUsers);
router.get('/me', auth, getAuthorizedUser);
router.get('/:id', auth, getUser);
router.post('/', register);

module.exports = router;
