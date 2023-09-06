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

//Upload avatar
const uploadAvatar = async (req, res) => {
  //images//
  try {
    const userId = req.params.userId;
    const tmpFilePath = req.file.path;
    console.log('🚀 ~ file: UserController.js:107 ~ uploadAvatar ~ tmpFilePath:', tmpFilePath);
    const fileName = `${Date.now()} - ${tmpFilePath.split(' - ')[1]}`;
    const removePath = __dirname.split('controllers')[0];
    const publicFilePath = path.join(removePath, 'public', 'uploads', fileName);
    fs.rename(tmpFilePath, publicFilePath, (err) => {
      if (err) return res.status(500).json({ message: err });
    });
    const uploadsPath = path.join('uploads', fileName);

    const data = await User.findByIdAndUpdate(userId, { avatar: uploadsPath }, { new: true });
    res.status(200).json({ message: 'Avatar updated successfully!', data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  patchEditUser,
  deleteUser,
  // getAllUser,
  uploadAvatar,
};
