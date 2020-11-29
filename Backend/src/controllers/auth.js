const AuthService = require('../services/auth');
const validate = require('../middlewares/validate');

const auth = new AuthService();

const express = require('express');
const {check} = require('express-validator');

const router = express.Router({mergeParams: true});

const authEmailValidators = [
  check('email').trim().isEmail(),
  check('password').trim().notEmpty(),
];

function emailAuth(req, res, next) {
  auth.signIn(req.body)
    .then(val => res.status(200).json(val))
    .catch(err => next(err));
}

const refreshValidators = [
  check('token').trim().isJWT(),
  check('refresh').trim().notEmpty(),
];

function refreshToken(req, res, next) {
  auth.refresh(req.body)
    .then(val => res.status(200).json(val))
    .catch(err => next(err));
}

router.post('/email', authEmailValidators, validate, emailAuth);
router.post('/refresh', refreshValidators, validate, refreshToken);

module.exports = router;
