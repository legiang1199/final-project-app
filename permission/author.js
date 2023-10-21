const role = require("../constants/role");

const adminRole = (req, res, next) => {
  if (req.user.role !== role.ADMIN)
    return res.status(403).send("Access denied");
  next();
};

const checkerRole = (req, res, next) => {
  if (req.user.role !== role.CHECKER)
    return res.status(403).send("Access denied");
  next();
};

const sellerRole = (req, res, next) => {
  if (req.user.role !== role.SELLER)
    return res.status(403).send("Access denied");
  next();
};

module.exports = {
  adminRole,
  checkerRole,
  sellerRole,
};
