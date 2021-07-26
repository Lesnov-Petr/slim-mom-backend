const express = require("express");
const router = express.Router();

const {
  userRegistrationValidation,
  userLoginValidation,
} = require("../middlewares/validation");
const { asyncWrapper } = require("../helpers/apiHelpers");
const { authMiddleware } = require("../middlewares/authMiddleware");

const {
  registrationController,
  logInController,
  logOutController,
  getCurrentUserController,
} = require("../controllers/usersController");

router.post(
  "/registration",
  userRegistrationValidation,
  asyncWrapper(registrationController)
);
router.post("/login", userLoginValidation, asyncWrapper(logInController));
router.post("/logout", authMiddleware, asyncWrapper(logOutController));
router.get("/current", authMiddleware, asyncWrapper(getCurrentUserController));

module.exports = router;
