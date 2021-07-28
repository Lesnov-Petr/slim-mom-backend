const { NotAuthorizedError } = require("../helpers/errors");
const jwt = require("jsonwebtoken");
const { User } = require("../db/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(' ');
    if (!token) {
      next(new NotAuthorizedError("Not authorized - not token data"));
    }
    const user = jwt.decode(token, process.env.JWT_SECRET);

    const userExist = await User.findOne({ _id: user._id });
    if (!userExist) {
      next(new NotAuthorizedError("Not authorized - user doesn't exist"));
    }
    if (userExist.token !== token) {
      console.log("userExist.token: ", userExist.token);
      console.log("token: ", token);
      next(new NotAuthorizedError("Not authorized - wrong token"));
    }
    req.user = userExist;
    console.log("req.user:  ", req.user);
    req.token = token;
    next();
  } catch (err) {
    console.log("err", err);
    next(new NotAuthorizedError("Invalid token"));
  }
};

module.exports = {
  authMiddleware,
};
