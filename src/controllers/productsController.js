const {
  searchProducts,
  publicRecommendation,
  privateRecommendation,
  addEatenProducts,
  deleteEatenProducts,
  getEatenProducts,
} = require("../services/productsServices");
const { QueryError, ClientError } = require('../helpers/errors')

const searchProductsController = async (req, res) => {
  const { query } = req.query;
  if (!query) {
    throw new QueryError('Provide a query string')
  }
  const productsList = await searchProducts(query);
  res.json({ message: "success", productsList });
};

const publicRecommendationController = async (req, res) => {
  const { bloodGroup } = req.body;
  if (Number.isNaN(bloodGroup)) {
    throw new ClientError("Blood group must be a number")
  }
  if (!bloodGroup) {
    throw new ClientError("Provide a blood group")
  }
  const productsNotAllowed = await publicRecommendation(bloodGroup);
  res.json({ message: "success", productsNotAllowed });
};

const privateRecommendationController = async (req, res) => {};

const addEatenProductsController = async (req, res) => {
  const owner = req.userId;
  const { title, weight, calories, date } = req.body;
  const savedProduct = await addEatenProducts({
    title,
    weight,
    calories,
    date,
    owner,
  });
  res.json({ message: "success", savedProduct });
};

const deleteEatenProductsController = async (req, res) => {
  // const { _id: userId } = req.user;
  const { id: eatenProductId } = req.params;
  await deleteEatenProducts(eatenProductId);
  res.json({ message: `Product has been successfully deleted` });
};

const getEatenProductsController = async (req, res) => {
  const { userId } = req.params;
  const { dateToFind } = req.body;
  const userFoodListByDay = await getEatenProducts(userId, dateToFind);
  res.json({ message: "succes", userFoodListByDay });
};

module.exports = {
  searchProductsController,
  publicRecommendationController,
  privateRecommendationController,
  addEatenProductsController,
  deleteEatenProductsController,
  getEatenProductsController,
};
