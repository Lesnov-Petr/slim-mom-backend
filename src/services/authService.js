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
    throw new NotAuthorizedError("Login  is wrong");
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError("Password is wrong");
  }

  const token = jwt.sign(
    {
      _id: user._id,
      login: user.login,
    },
    process.env.JWT_SECRET
  );

  await User.findByIdAndUpdate(user._id, { $set: { token } }, { new: true });
  return { token, login };
};

const registration = async ({
  login,
  email,
  password,
  height,
  weight,
  desiredWeight,
  bloodGroup,
  age,
}) => {
  const existEmail = await User.findOne({ email });
  const existLogin = await User.findOne({ login });
  if (existEmail || existLogin) {
    throw new RegistrationConflictError("Email or login is already used");
  }
  const user = new User({
    login,
    email,
    password,
    height,
    weight,
    desiredWeight,
    bloodGroup,
    age,
  });
  await user.save();
  return logIn({ login, password });
};

const logOut = async (userId) => {
  const logoutUser = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { token: null } },
    { new: true }
  );

  if (!logoutUser) {
    throw new NotAuthorizedError("Not authorized");
  }

  return logoutUser;
};

const checkCurrentUser = async (token) => {
  const user = await User.findOne({ token })
    .select({ password: 0, "__v": 0 })

  return user
}

module.exports = {
  registration,
  logIn,
  logOut,
  checkCurrentUser
};
