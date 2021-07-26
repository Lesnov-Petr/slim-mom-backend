// =============================================
// пример с использованием "asyncWrapper"
// router.post('/signup', userValidation, asyncWrapper(signupController))
// =============================================

const express = require("express");
const router = express.Router();

// const {
//   authorizationValidation,
//   subscriptionValidation
// } = require('../../middlewares/validation')
const { asyncWrapper } = require("../helpers/apiHelpers");
// const { authMiddleware } = require('../middlewares/authMiddleware')

const {
  registrationController,
  logInController,
  logOutController,
  getCurrentUserController,
  updateSubscriptionController,
} = require("../controllers/usersController");

router.post(
  "/registration",

  asyncWrapper(registrationController)
);
router.post("/login", asyncWrapper(logInController));
router.post("/logout", asyncWrapper(logOutController));
router.get("/current", asyncWrapper(getCurrentUserController));
router.patch("/", asyncWrapper(updateSubscriptionController));
// router.post(
//   "/registration",
//   authorizationValidation,
//   asyncWrapper(registrationController)
// );
// router.post("/login", authorizationValidation, asyncWrapper(logInController));
// router.post("/logout", authMiddleware, asyncWrapper(logOutController));
// router.get("/current", authMiddleware, asyncWrapper(getCurrentUserController));
// router.patch(
//   "/",
//   authMiddleware,
//   subscriptionValidation,
//   asyncWrapper(updateSubscriptionController)
// );

module.exports = router;
