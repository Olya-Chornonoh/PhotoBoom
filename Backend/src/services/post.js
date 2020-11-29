const {literal} = require('sequelize');
const User = require('../model/user');
const Post = require('../model/post');

const likesCount = [
  literal(
      '(select count(*) ' +
      'from `post_like` ' +
      'where `post_like`.`post_id` = `Post`.`id`)'),
  'likes_count',
];

const commentCount = [
  literal(
      '(select count(*) ' +
      'from `comment` ' +
      'where `comment`.`post_id` = `Post`.`id`)'),
  'comment_count',
];

class PostService {
  getAll(limit, offset) {
    return Post.findAndCountAll({
      attributes: { include: [likesCount, commentCount] },
      include: [User],
      limit: limit,
      offset: offset,
    });
  }

  getAllForUser(userId, limit, offset) {
    return Post.findAndCountAll({
      user_id: userId,
      attributes: { include: [likesCount, commentCount] },
      include: [User],
      limit: limit,
      offset: offset,
    });
  }

  get(postId) {
    return Post.findOne({
      where: {id: postId},
      attributes: { include: [likesCount, commentCount] },
      include: [User],
    });
  }

  create(userId, request) {
    return Post.create({
      user_id: userId,
      ...request,
    });
  }

  delete(postId) {
    return Post.destroy({
      where: {id: postId},
    });
  }
}

module.exports = PostService;
