require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { connectDatabase } = require("./database/connect");
const userRoutes = require("./routes/api/user");
const authRouter = require('./routes/api/auth');

// const productRoutes = require('./routes/api/product');
// const auctionRoutes = require('./routes/api/auction');
// const ratingRoutes = require('./routes/api/rating');
// const chatRoutes = require('./routes/api/chat');
// const paymentRoutes = require('./routes/api/payment');

var indexRouter = require("./routes/index");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", userRoutes);
app.use('/api/auth', authRouter);

// app.use('/api', productRoutes);
// app.use('/api', auctionRoutes);
// app.use('/api', ratingRoutes);
// app.use('/api', chatRoutes);
// app.use('/api', paymentRoutes);

// /users/

//connect to database
(async () => {
  await connectDatabase();
})();

module.exports = app;
