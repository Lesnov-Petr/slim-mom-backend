const { registration, logIn, logOut } = require("../services/authService");

const registrationController = async (req, res, next) => {
  const {
    login,
    email,
    password,
    height,
    weight,
    desiredWeight,
    bloodGroup,
    age,
  } = req.body;
  const user = await registration({
    login,
    email,
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
  const { email, password } = req.body;
  const user = await logIn({ email, password });
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
