const PostLikeService = require('../services/post_like');

const auth = require('../middlewares/auth');

const postLike = new PostLikeService();
const {NotFound} = require('http-errors');

const express = require('express');

const router = express.Router({mergeParams: true});

function create(req, res, next) {
  postLike.create(req['userId'], req.params.postId)
    .then(result => res.status(201).json(result))
    .catch(err => next(err));
}

function deleteLike(req, res, next) {
  post.delete(req.params.likeId)
    .then(result => res.status(204).json(result))
    .catch(err => next(err));
}

router.post('/likes/', auth, create);
router.delete('/likes/:likeId', auth, deleteLike);

module.exports = router;
