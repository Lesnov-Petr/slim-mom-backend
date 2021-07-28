const { registration, logIn, logOut } = require("../services/authService");

const registrationController = async (req, res, next) => {
  const { name,
  login,
  password,
  height,
  weight,
  desiredWeight,
  bloodGroup,
  age, } = req.body;
  const user = await registration({
    name,
    login,
    password,
    height,
    weight,
    desiredWeight,
    bloodGroup,
    age,
  });
  res.status(201).json({ user });
};

const logInController = async (req, res, next) => {
  const { login, password } = req.body;
  const user = await logIn({ login, password });
  return res.status(200).json({ user });
};

const logOutController = async (req, res) => {
  const { userId } = req;
  await logOut(userId);

  res.status(204).json({ message: `No Content - logout sucsess by ${userId}` });
};

module.exports = {
  registrationController,
  logInController,
  logOutController,
};
