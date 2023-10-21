const UserServices = require('../Services/UserServices');
const { User } = require('../database/models/User');

const getAllUsers = async (req, res, next) => {
  try {
    const user = await UserServices.getAllUsers();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    if (!req.body) return res.sendStatus(400);
    const user = await UserServices.createUser(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await UserServices.getUserById(req.params.userId);
    if (!req.params.userId) return res.status(400).json({ message: 'Not found ID!' });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const patchEditUser = async (req, res, next) => {
  try {
    const userUpdate = await User.findByIdAndUpdate(req.params.userId, req.body);
    res.status(200).json(userUpdate);
  } catch (err) {
    res.status(400).json({message: error.message});
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const deleteUserInfo = await User.findByIdAndDelete(req.params.userId);
    res.status(200).json(deleteUserInfo);
  } catch (err) {
    res.status(400).json({message: error.message});

  }
};



module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  patchEditUser,
  deleteUser,
  // getAllUser,

};
