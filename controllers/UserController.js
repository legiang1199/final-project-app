const UserServices = require("../Services/UserServices");
const User = require("../database/models/User");
const connectCloudinary = require("../database/cloudinary");

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
    res.status(400).json({ message: error.message });
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await UserServices.getUserById(req.params.userId);
    if (!req.params.userId)
      return res.status(400).json({ message: "Not found ID!" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const patchEditUser = async (req, res, next) => {
  // const { userId } = req.params;
  // const { imgUrl, fullname, email, phoneNumber, address } = req.body;
  // try {
  //   if (imgUrl) {
  //     const result = await connectCloudinary.uploader.upload(imgUrl, {
  //       upload_preset: "auction_app",
  //       width: 500,
  //       height: 500,
  //       crop: "fill",
  //     });

  //     if (result) {
  //       const user = await UserServices.patchEditUser(userId, {
  //         imgUrl: result.secure_url,
  //       });
  //       res.status(200).json(user);
  //     }
  //   }
  // } catch (error) {
  //   res.status(400).json({ message: error.message });
  // }
  // try {
//   const userUpdate = await User.findByIdAndUpdate(req.params.userId, req.body);
//   res.status(200).json(userUpdate);
//   console.log(userUpdate);
// } catch (error) {
//   res.status(400).json({message: error.message});
// }
try {
  const userUpdate = await User.findByIdAndUpdate(req.params.userId, req.body);
  res.status(200).json(userUpdate);
  console.log(userUpdate);
} catch (error) {
  res.status(400).json({message: error.message});
}
};


const deleteUser = async (req, res, next) => {
  try {
    const deleteUserInfo = await User.findByIdAndDelete(req.params.userId);
    res.status(200).json(deleteUserInfo);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
