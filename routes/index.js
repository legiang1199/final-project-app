const express = require("express");
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  if (req.session && req.session.passport) {
    res.send({
      message: 'You are allowed.',
      user: req.session.passport.user,
      fullname: req.session.passport.user.fullname,
    });
  } else {
    res.json({
      message: 'You are not allowed to access this API endpoint',
      error: 'You are not signed in.',
    });
  }
});


module.exports = router;
