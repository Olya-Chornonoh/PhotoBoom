const database = require('../loaders/sequelize');

const { Sequelize, DataTypes, Model } = require('sequelize');

const User = require('./user'); 
const Post = require('./post');

class Comment extends Model {}

Comment.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true
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
	},
	comment: {
		type: DataTypes.STRING
	} 
}, {
	sequelize: database,
	tableName: "comment",
	modelName: 'Comment'
});

module.exports = Comment;
