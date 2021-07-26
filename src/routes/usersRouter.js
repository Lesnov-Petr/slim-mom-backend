// =============================================
// пример с использованием "asyncWrapper"
// router.post('/signup', userValidation, asyncWrapper(signupController))
// =============================================

const express = require("express");
const router = express.Router();

const { userRegistrationValidation } = require("../middlewares/validation");
const { asyncWrapper } = require("../helpers/apiHelpers");
// const { authMiddleware } = require('../middlewares/authMiddleware')

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
router.post(
  "/login",
  userRegistrationValidation,
  asyncWrapper(logInController)
);
router.post("/logout", asyncWrapper(logOutController));
router.get("/current", asyncWrapper(getCurrentUserController));

// router.post("/logout", authMiddleware, asyncWrapper(logOutController));
// router.get("/current", authMiddleware, asyncWrapper(getCurrentUserController));
// router.patch(
//   "/",
//   authMiddleware,
//   subscriptionValidation,
//   asyncWrapper(updateSubscriptionController)
// );

module.exports = router;
