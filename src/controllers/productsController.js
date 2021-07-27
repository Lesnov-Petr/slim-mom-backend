const {
  searchProducts,
  publicRecommendation,
  privateRecommendation,
  postEatenProducts,
  deleteEatenProducts,
  getEatenProducts,
} = require("../services/productsServices");

const searchProductsController = async (req, res) => {
  const { query } = req.query;
  const productsList = await searchProducts(query);
  res.json({ message: "success", productsList });
};

const publicRecommendationController = async (req, res) => {
  const { height, weight, age, desiredWeight, bloodGroup } = req.body;
  const recommendation = await publicRecommendation({
    height,
    weight,
    age,
    desiredWeight,
    bloodGroup,
  });
  res.json({ message: "success", recommendation });
};

const privateRecommendationController = async (req, res) => {
  const { _id: userId } = req.user;
  const { height, weight, age, desiredWeight, bloodGroup } = req.body;
  const recommendation = await privateRecommendation(
    {
      height,
      weight,
      age,
      desiredWeight,
      bloodGroup,
    },
    userId
  );
  res.json({ message: "success", recommendation });
};

const addEatenProductsController = async (req, res) => {
  const { userId } = req.params;
  const { title, weight, calories, date } = req.body;
  const savedProduct = await postEatenProducts({
    title,
    weight,
    calories,
    date,
    userId,
  });
  res.json({ message: "success", savedProduct });
};

const deleteEatenProductsController = async (req, res) => {
  // const { dateToFind } = req.body;
  const { id: eatenProductId } = req.params;
  const { _id: userId } = req.user;

  await deleteEatenProducts(eatenProductId, userId);
  res.json({ message: `Product has been successfully deleted` });
};

const getEatenProductsController = async (req, res) => {
  const { _id: userId } = req.user;
  const { dateToFind } = req.body;
  const userFoodListByDay = await getEatenProducts(userId, dateToFind);
  res.json({ message: "success", userFoodListByDay });
};

module.exports = {
  searchProductsController,
  publicRecommendationController,
  privateRecommendationController,
  addEatenProductsController,
  deleteEatenProductsController,
  getEatenProductsController,
};
