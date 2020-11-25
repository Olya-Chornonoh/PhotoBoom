const CommentService = require("../services/comment");

const auth = require('../middlewares/auth');

const comment = new CommentService();

const express = require('express');
const {NotFound} = require('http-errors');

const router = express.Router();

function getAll(req, res, next){
  const limit = Number(req.query.limit) || 10;
  const offset = Number(req.query.offset) || 0;
  comment.getAll(req.params.postId, limit, offset)
  .then(result => res.status(200).json(result))
  .catch(err => next(err));
}

function create(req, res, next){
  comment.create(req['userId'], req.params.postId, req.body.comment)
  .then(result => res.status(201).json(result))
  .catch(err => next(err));
}

function update(req, res, next) {
  comment.update(req.params.commentId, req.body.comment)
  .then(result => res.status(200).json(result))
  .catch(err => next(err));
}

function deleteComment(req, res, next) {
  comment.delete(req.params.commentId)
  .then(result => res.status(204).json(result))
  .catch(err => next(err));
}

router.get('/comments/', auth, getAll);
router.post('/comments/', auth, create);
router.put('/comments/:commentId', auth, update);
router.delete('/comments/:commentId', auth, deleteComment);

module.exports = router;
