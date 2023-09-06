require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { connectDatabase } = require("./database/connect");
const userRoutes = require("./routes/api/user");
const authRouter = require("./routes/api/auth");
const productRoutes = require("./routes/api/product");
const categoryRoutes = require("./routes/api/category");
const auctionRoutes = require("./routes/api/auction");


// const productRoutes = require('./routes/api/product');
// const auctionRoutes = require('./routes/api/auction');
// const ratingRoutes = require('./routes/api/rating');
// const chatRoutes = require('./routes/api/chat');
// const paymentRoutes = require('./routes/api/payment');

const indexRouter = require("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRouter);
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/auction", auctionRoutes);


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
