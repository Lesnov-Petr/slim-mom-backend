// const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken"); //+

const { User } = require("../db/userModel"); //+
const {
  NotAuthorizedError,
  RegistrationConflictError,
} = require("../helpers/errors"); //+

const registration = async ({ name, login, password }) => {
  const existLogin = await User.findOne({ login });
  if (existLogin) {
    throw new RegistrationConflictError("Login is already used");
  }
  const user = new User({
    name,
    login,
    password,
  });
  const newUser = await user.save();
  // await user.save()
  return { login: newUser.login, subscription: newUser.subscription };
}; //+-

const login = async ({ login, password }) => {
  const user = await User.findOne({ login });

  console.log("user:  ", user);

  if (!user) {
    throw new NotAuthorizedError("login  is wrong");
  }
  // if (!await bcrypt.compare(password, user.password)) {
  // if (await bcrypt.compare(password, user.password)) {
  if (!(password === user.password)) {
    console.log("password:  ", password);
    throw new NotAuthorizedError("Password is wrong");
    }
    
  const token = jwt.sign(
    {
      _id: user._id,
      login: user.login,
      subscription: user.subscription,
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

const logout = async ({ userId, token }) => {
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

const updateSubscription = async ({ token, subscription }, userId) => {
  const updateUserSubscription = await User.findByIdAndUpdate(
    { _id: userId, token },
    { $set: { subscription } },
    { new: true }
  );
  if (!updateUserSubscription) {
    throw new NotAuthorizedError("Not authorized");
  }
  return updateUserSubscription;
};

module.exports = {
  registration,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
};
