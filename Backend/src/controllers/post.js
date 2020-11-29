const PostService = require('../services/post');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const multer = require('multer');
const shortid = require('shortid');
const mime = require('mime-types');

const post = new PostService();
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req,file,cb) {
      cb(null, 'uploads');
    },
    filename: function (req,file,cb) {
      /* generates a "unique" name - not collision proof but unique enough for small sized applications */
      let id = shortid.generate();
      /* need to use the file's mimetype because the file name may not have an extension at all */
      let ext = mime.extension(file.mimetype);
      cb(null, `${id}.${ext}`);
    }
  }),
});

const express = require('express');
const { NotFound } = require('http-errors');

const router = express.Router({mergeParams: true});

function getAll(req, res, next) {
  const limit = Number(req.query.limit) || 10;
  const offset = Number(req.query.offset) || 0;
  post.getAll(limit, offset)
    .then(result => res.status(200).json(result))
    .catch(err => next(err));
}

function getOne(req, res, next) {
  post.get(req.params.id)
    .then(result => {
      if (result) {
        return res.status(200).json(result);
      } else {
        return next(NotFound('Post not found'));
      }
    }).catch(err => next(err));
}

function getPostsAuthUser(req, res, next) {
  const limit = Number(req.query.limit) || 10;
  const offset = Number(req.query.offset) || 0;
  post.getAllForUser(req['userId'], limit, offset)
    .then(result => res.status(200).json(result))
    .catch(err => next(err));
}

function getPostsUser(req, res, next) {
  const limit = Number(req.query.limit) || 10;
  const offset = Number(req.query.offset) || 0;
  post.getAllForUser(req.params.id, limit, offset)
    .then(result => res.status(200).json(result))
    .catch(err => next(err));
}

function create(req, res, next) {
  if (req.file) {
    req.body.link = req.file.destination + '/' + req.file.filename;
  }

  post.create(req['userId'], req.body)
    .then(result => res.status(201).json(result))
    .catch(err => next(err));
}

function deletePost(req, res, next) {
  post.delete(req.params.id)
    .then(result => res.status(204).json(result))
    .catch(err => next(err));
}

router.get('/', auth, getAll);
router.get('/:id', auth, getOne);
router.get('/users/me', auth, getPostsAuthUser);
router.get('/users/:id', auth, getPostsUser);
router.post('/', upload.single('photo'), auth, create);
router.delete('/:id', auth, deletePost);

module.exports = router;
