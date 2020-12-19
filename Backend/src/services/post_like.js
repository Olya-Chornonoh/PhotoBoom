const PostLike = require('../model/post_like');

class PostLikeService {
  getForPost(postId, limit, offset){
    return PostLike.findAndCountAll({
      where: {
        post_id: postId
      },
      limit, 
      offset,
    });
  } 
  create(userId, postId) {
    return PostLike.create({
      user_id: userId,
      post_id: postId,
    });
  }

  delete(likeId) {
    return PostLike.destroy({
      where: {id: likeId},
    });
  }
}

module.exports = PostLikeService;
