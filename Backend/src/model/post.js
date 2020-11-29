const database = require('../loaders/sequelize');

const { Sequelize, DataTypes, Model } = require('sequelize');

const User = require('./user');

class Post extends Model { }

Post.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	link: {
		type: DataTypes.STRING
	},
	description: {
		type: DataTypes.STRING
	},
	user_id: {
		type: DataTypes.INTEGER,
		references: {
			model: User,
			key: 'id',
		},
	}
}, {
	sequelize: database,
	tableName: 'post',
	modelName: 'Post'
});

Post.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Post;
