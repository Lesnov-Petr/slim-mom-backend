const { registration, logIn, logOut } = require("../services/authService");

const registrationController = async (req, res, next) => {
  const { name, login, password } = req.body;
  const user = await registration({
    name,
    login,
    password,
  });
  res.status(201).json({ user });
};

const logInController = async (req, res, next) => {
  const { login, password } = req.body;
  const user = await logIn({ login, password });
  return res.status(200).json({ user });
};

const logOutController = async (req, res) => {
  const { id } = req.user;
  await logOut({
    id,
  });

  res.status(204).json({ status: `No Content - logout sucsess by ${id}` });
};

module.exports = {
  registrationController,
  logInController,
  logOutController,
};
