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
const statsRoutes = require("./routes/api/stats");
const cors = require("cors");
const bidRoutes = require("./routes/api/bid");
const {isLoggedIn} = require("./middlewares/authMiddleware");
const { connectCloudinary } = require("./database/cloudinary");
const passport = require("passport");
const session = require("express-session");
const googleRoutes = require("./routes/api/google-auth");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./database/models/User");

const indexRouter = require("./routes/index");

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET_KEY,
    maxAge: 3600000,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
      done(null, user);
  })
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({googleId: profile.id}).then(existingUser => {
      if (existingUser) {
          done(null, existingUser);
      } else {
          new User({googleId: profile.id,
              fullname: profile.displayName,
              email: profile.emails[0].value,
  
          
          }).save().then(user => done(null, user));
      }
  });
}));


app.use("/", indexRouter);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRouter);
app.use("/api/product", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auction", auctionRoutes);
app.use("/api/bid", bidRoutes);
app.use("/api/stats", statsRoutes);
app.use('/auth/google', googleRoutes);
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: async function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

//connect to database
(async () => {
  await connectDatabase(),connectCloudinary();;
})();

module.exports = app;
