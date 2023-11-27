// models/User.js
const mongoose = require("mongoose");
const Role = require('../../constants/role');

const userSchema = new mongoose.Schema({
  googleId: String,
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  role: {
    type: String,
    enum: [Role.ADMIN_ROLE, Role.CHECKER_ROLE, Role.SELLER_ROLE, Role.USER_ROLE],
    default: Role.USER_ROLE,
  },
  imgUrl: { type: String , default: ''},
  verified: {
    type: Boolean,
    default: false,
  },
  phoneNumber: { type: String },
  address: { type: String },
},
{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
