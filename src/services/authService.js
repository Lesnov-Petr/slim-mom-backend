// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../db/userModel");
const {
  NotAuthorizedError,
  RegistrationConflictError,
} = require("../helpers/errors");

const logIn = async ({ login, password }) => {
  const user = await User.findOne({ login });

  console.log("user:  ", user);

  if (!user) {
    throw new NotAuthorizedError("login  is wrong");
  }
  // if (!await bcrypt.compare(password, user.password)) {
  if (!(password === user.password)) {
    console.log("password:  ", password);
    throw new NotAuthorizedError("Password is wrong");
  }

  const token = jwt.sign(
    {
      _id: user._id,
      login: user.login,
    },
    process.env.JWT_SECRET
  );

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { $set: { token } },
    { new: true }
  );
  return updatedUser;
};

const registration = async ({ name, login, password, userInfo }) => {
  const existLogin = await User.findOne({ login });
  if (existLogin) {
    throw new RegistrationConflictError("Login is already used");
  }
  const user = new User({
    name,
    login,
    password,
    userInfo,
  });
  await user.save();

  return logIn({ login, password });
};

const logOut = async ({ userId, token }) => {
  const logoutUser = await User.findOneAndUpdate(
    { _id: userId, token },
    { $set: { token: null } },
    { new: true }
  );
  if (!logoutUser) {
    throw new NotAuthorizedError("Not authorized");
  }
};

const getCurrentUser = async ({ userId, token }) => {
  const currentUser = await User.findOne({ _id: userId, token });

  console.log("currentUser", currentUser);
  if (!currentUser) {
    throw new NotAuthorizedError("Not authorized");
  }
  return currentUser;
};

module.exports = {
  registration,
  logIn,
  logOut,
  getCurrentUser,
};
