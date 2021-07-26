const {
  login,
  registration,
  logout,
  getCurrentUser,
  updateSubscription,
} = require("../services/authService");

const registrationController = async (req, res, next) => {
  const { name, login, password } = req.body;
  await registration({ name, login, password });
  res.status(201).json({ status: "created" });
  // res.status(201).json({
  //   user: {
  //     name: name,
  //     login: login,
  //     password: password
  //   }
  // })
};

const logInController = async (req, res, next) => {
  const { login, password } = req.body;
  const token = await login({ login, password });
  return res.status(200).json({ token });
};

const logOutController = async (req, res) => {
  const { userId } = req.user;
  const token = req.token;
  await logout({
    userId,
    token,
  });

  res.status(204).json({ status: "No Content" });
};

const getCurrentUserController = async (req, res, next) => {
  const token = req.token;
  const { _id: userId } = req.user;
  const currentUser = await getCurrentUser({ userId, token });
  return res.status(200).json({ currentUser });
};
const updateSubscriptionController = async (req, res, next) => {
  const token = req.token;
  const { subscription } = req.body;
  const { _id: userId } = req.user;
  const currentUser = await updateSubscription({ token, subscription }, userId);
  res.status(200).json({ currentUser });
};

module.exports = {
  registrationController,
  logInController,
  logOutController,
  getCurrentUserController,
  updateSubscriptionController,
};
