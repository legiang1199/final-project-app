const UserModel = require('../database/models/User');

const getAllUsers = async () => {
  const users = await UserModel.find();
  console.log(users);
  return users;
};

const findUserById = async (userId) => {
  try {
    const users = await UserModel.findById(userId);
    return users;
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (user) => {
    try {
        const users = await UserModel.create(user)
        return users
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
  getAllUsers,
  createUser,
  findUserById,
};
