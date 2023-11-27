require('dotenv').config();
const mongoose = require('mongoose');

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);
  const hour = `0${d.getHours()}`.slice(-2);
  const minute = `0${d.getMinutes()}`.slice(-2);
  const second = `0${d.getSeconds()}`.slice(-2);
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

const connectDatabase = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    });
    console.log(
      `${formatDate(Date.now())}Connect to Database OK, listening on http://localhost:${process.env.PORT || 3001}`,
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  connectDatabase,
};
