const jwt = require('jsonwebtoken');

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.access_token || req.headers.access_token;
   
    console.log(token);

    if (!token) return res.status(401).send('Unauthorized: No token provided');

    const { id, email, role, fullname } = jwt.verify(token, process.env.SECRET_KEY);

    req.user = { id, email, role, fullname };

    next();
  } catch (error) {
console.log(error);
    return res.sendStatus(500);
  }
};

module.exports = { isLoggedIn };
