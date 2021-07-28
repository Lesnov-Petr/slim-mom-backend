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
router.post("/eaten", asyncWrapper(addEatenProductsController));
router.delete("/eaten/:id", asyncWrapper(deleteEatenProductsController));
router.get("/eaten", asyncWrapper(getEatenProductsController));

module.exports = { productsRouter: router };
