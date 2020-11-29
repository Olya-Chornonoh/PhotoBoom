const database = require('../loaders/sequelize');

const { Sequelize, DataTypes, Model } = require('sequelize');

const User = require('./user');
const Post = require('./post');

class PostLike extends Model { }

PostLike.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Post,
            key: 'id',
        },
    }
}, {
    sequelize: database,
    tableName: 'post_like',
    modelName: 'PostLike'
});

PostLike.belongsTo(User, { foreignKey: 'user_id' });
PostLike.belongsTo(Post, { foreignKey: 'post_id' });

module.exports = PostLike;
