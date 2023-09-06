const express = require("express");
const router = express.Router();

const {
  getUserById,
  patchEditUser,
  deleteUser,
  getAllUsers,
  uploadAvatar,
} = require("../../controllers/userController");

// const { avatarUploader } = require('../../middlewares/Uploader');
// const { adminRole } = require('../../permission/author');

//METHOD GET
// router.get('/', adminRole, getAllUser);
router.get("/", getAllUsers);

router.get("/:userId", getUserById);

//upload user images
router.post("/avatar/:userId", uploadAvatar);

//METHOD PATCH
router.patch("/:userId", patchEditUser);

//METHOD DELETE
router.delete("/:userId", deleteUser);

module.exports = router;