require('dotenv').config();
const cloudinary = require('cloudinary').v2;



const connectCloudinary = async () => {
    try {
    await cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });
    console.log('Connect to Cloudinary OK');
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
connectCloudinary,
};