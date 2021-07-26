const {
  registration,
  logIn,
  logOut,
  getCurrentUser,
} = require("../services/authService");

const registrationController = async (req, res, next) => {
  const { name, login, password, userInfo } = req.body;
  await registration({ name, login, password, userInfo });
  res.status(201).json({ status: "created" });
};

const logInController = async (req, res, next) => {
  const { login, password } = req.body;
  const user = await logIn({ login, password });
  return res.status(200).json({ user });
};

const logOutController = async (req, res) => {
  const { userId } = req.user;
  const token = req.token;
  await logOut({
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

module.exports = {
  registrationController,
  logInController,
  logOutController,
  getCurrentUserController,
};
