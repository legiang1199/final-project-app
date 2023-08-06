// models/User.js
const mongoose = require("mongoose");
const Role = require('../../constants/role');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: [Role.ADMIN_ROLE, Role.CHECKER_ROLE, Role.SELLER_ROLE, Role.USER_ROLE],
    default: Role.USER_ROLE,
  },
  avatar: { type: String },
  verified: {
    type: Boolean,
    default: false,
  },
},
{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
