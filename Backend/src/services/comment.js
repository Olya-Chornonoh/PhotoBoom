const Comment = require('../model/comment');
const Post = require('../model/post');
const User = require('../model/user');

class CommentService {
  create(userId, postId, comment) {
    return Comment.create({
      user_id: userId,
      post_id: postId,
      comment,
    });
  }

  update(commentId, comment) {
    return Comment.update({comment}, {
      where: {id: commentId},
    });
  }

  delete(commentId) {
    return Comment.destroy({
      where: {id: commentId},
    });
  }
  getAll(postId, limit, offset){
    return Comment.findAndCountAll({
      where: {
        post_id: postId
      },
      include: [User, Post],
      limit, 
      offset,
    });
  } 
}

module.exports = CommentService;
