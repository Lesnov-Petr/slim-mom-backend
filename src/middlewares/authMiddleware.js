const { NotAuthorizedError } = require("../helpers/errors");
const jwt = require("jsonwebtoken");
const { User } = require("../db/userModel");

const authMiddleware = async (req, res, next) => {
  const [, token] = req.headers.authorization.split(' ');
  if (!token) {
    next(new NotAuthorizedError("Not authorized - not token data"));
  }

  const user = await User.findOne({token})
  if (!user) {
    next(new NotAuthorizedError("Not authorized - wrong token"));
  }

  try {
    const { _id } = jwt.decode(token, process.env.JWT_SECRET);
    req.userId = _id
    req.token = token
    next();
  } catch (err) {
     next(new NotAuthorizedError(err.message))
  }
};

module.exports = {
  authMiddleware,
};
