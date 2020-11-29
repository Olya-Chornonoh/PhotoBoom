const {Op} = require('sequelize');
const bcrypt = require('bcrypt');

const User = require("../model/user");

class UserService {
  async create(request) {
    // hash password with bcrypt
    const password = await bcrypt.hash(request.password, 10);

    const user = await User.create({...request, password});

    return user;
  }

  get(userId) {
    return User.findOne({
      where: {id: userId},
    });
  }

  search(login, offset, limit) {
    return User.findAndCountAll({
      where: {
        login: {
          [Op.like]: `%${login}%`,
        },
      },
      offset,
      limit,
    });
  }
}

module.exports = UserService;
