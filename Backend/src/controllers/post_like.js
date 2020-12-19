const PostLikeService = require('../services/post_like');

const auth = require('../middlewares/auth');

const postLike = new PostLikeService();
const {NotFound} = require('http-errors');

const express = require('express');

const router = express.Router({mergeParams: true});

function get(req, res, next) {
  const limit = Number(req.query.limit) || 10;
  const offset = Number(req.query.offset) || 0;
  postLike.getForPost(req.params.postId, limit, offset)
    .then(result => res.status(200).json(result))
    .catch(err => next(err));
}

function create(req, res, next) {
  postLike.create(req['userId'], req.params.postId)
    .then(result => res.status(201).json(result))
    .catch(err => next(err));
}

function deleteLike(req, res, next) {
  postLike.delete(req.params.likeId)
    .then(result => res.status(204).json(result))
    .catch(err => next(err));
}

router.get('/likes', auth, get);
router.post('/likes/', auth, create);
router.delete('/likes/:likeId', auth, deleteLike);

module.exports = router;
