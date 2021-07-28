const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../db/userModel");
const {
  NotAuthorizedError,
  RegistrationConflictError,
} = require("../helpers/errors");

const logIn = async ({ login, password }) => {
  const user = await User.findOne({ login });
  if (!user) {
    throw new NotAuthorizedError("login  is wrong");
  }
  if (!await bcrypt.compare(password, user.password)) {
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

const registration = async ({
  name,
  login,
  password,
  height,
  weight,
  desiredWeight,
  bloodGroup,
  age,
}) => {
  const existLogin = await User.findOne({ login });
  if (existLogin) {
    throw new RegistrationConflictError("Login is already used");
  }
  const user = new User({
    name,
    login,
    password,
    height,
    weight,
    desiredWeight,
    bloodGroup,
    age,
  });
  await user.save();
  await logIn({ login, password });
  return {name, login}
};

const logOut = async ({ id }) => {
  const logoutUser = await User.findOneAndUpdate(
    { _id: id },
    { $set: { token: null } },
    { new: true }
  );

  if (!logoutUser) {
    throw new NotAuthorizedError("Not authorized");
  }

  return logoutUser;
};

module.exports = {
  registration,
  logIn,
  logOut,
};
