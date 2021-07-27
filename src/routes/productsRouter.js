const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../helpers/apiHelpers");
const { authMiddleware } = require("../middlewares/authMiddleware");

const {
  searchProductsController,
  publicRecommendationController,
  privateRecommendationController,
  addEatenProductsController,
  deleteEatenProductsController,
  getEatenProductsController,
} = require("../controllers/productsController");

router.use(authMiddleware);
router.get("/search", asyncWrapper(searchProductsController));
router.get("/recommendation", asyncWrapper(publicRecommendationController));
router.post("/recommendation", asyncWrapper(privateRecommendationController));
// 8 энд-поинт на добавление съеденного продукта в конкретный день
router.post("/eaten/:userId", asyncWrapper(addEatenProductsController));

// 9 энд-поинт на удаление съеденного продукта в конкретный день
router.delete("/eaten/:id", asyncWrapper(deleteEatenProductsController));
// 10 энд-поинт на получение всей информации по конкретному дню
router.get("/eaten", asyncWrapper(getEatenProductsController));

module.exports = { productsRouter: router };
