const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;
const { Products } = require("../db/productsModel");
const { EatenProducts } = require("../db/eatenProductsModel");

const { QueryError } = require("../helpers/errors");

const searchProducts = async (query) => {
  const allProductsList = await Products.find({});
  const templatedQuery = query.trim().toLowerCase().split(" ");
  const queriedProducts = allProductsList.filter((product) => {
    const templatedTitle = product.title.ru.toLowerCase().split(" ");
    let coincidences = true;
    for (const queryWord of templatedQuery) {
      if (!templatedTitle.includes(queryWord)) {
        coincidences = false;
      }
    }
    return coincidences;
  });

  if (queriedProducts.length === 0) {
    throw new QueryError("No product found. Try another title.");
  }
  return queriedProducts;
};

const publicRecommendation = async ({
  height,
  weight,
  age,
  desiredWeight,
  bloodGroup,
}) => {
  const recommendedCaloriesPerDay =
    10 * Number(weight) +
    6.25 * Number(height) -
    5 * Number(age) -
    161 -
    10 * (Number(weight) - Number(desiredWeight));

  const allProductsList = await Products.find({});
  const productsNotAllowed = allProductsList.reduce((acc, product) => {
    if (product.groupBloodNotAllowed[Number(bloodGroup)]) {
      acc.push(...product.categories);
    }
    const uniqueList = acc.filter(
      (category, index, arr) => arr.indexOf(category) === index
    );
    return uniqueList;
  }, []);
  return { recommendedCaloriesPerDay, productsNotAllowed };
};

const privateRecommendation = async (
  { height, weight, age, desiredWeight, bloodGroup },
  userId
) => {
  const user = await User.findById({ userId });
  const recommendedCaloriesPerDay =
    10 * Number(weight) +
    6.25 * Number(height) -
    5 * Number(age) -
    161 -
    10 * (Number(weight) - Number(desiredWeight));

  const allProductsList = await Products.find({});

  const productsNotAllowed = allProductsList.reduce((acc, product) => {
    if (product.groupBloodNotAllowed[Number(bloodGroup)]) {
      acc.push(...product.categories);
    }
    const uniqueList = acc.filter(
      (category, index, arr) => arr.indexOf(category) === index
    );
    return uniqueList;
  }, []);

  return { recommendedCaloriesPerDay, productsNotAllowed };
};

const postEatenProducts = async ({ title, weight, calories, userId, date }) => {
  const user = await EatenProducts.findOne({ userId });
  const _id = new ObjectID();
  if (!user) {
    const newUserProductList = new EatenProducts({
      userId,
      eatenProducts: [{ _id, title, weight, calories, date }],
    });
    await newUserProductList.save();
    return _id;
  }
  await EatenProducts.findOneAndUpdate(
    { userId },
    { $push: { eatenProducts: { _id, title, weight, calories, date } } }
  );
  return _id;
};

const deleteEatenProducts = async (eatenProductId, userId) => {
  await EatenProducts.findOneAndRemove({
    _id: ObjectID(eatenProductId),
    userId,
  });
};

const getEatenProducts = async (userId, dateToFind) => {
  const userFoodList = await EatenProducts.findOne({
    userId,
  });

  const userFoodListByDate = await userFoodList.eatenProducts.filter(
    ({ date }) => date === dateToFind
  );
  return userFoodListByDate;
};

module.exports = {
  searchProducts,
  publicRecommendation,
  privateRecommendation,
  postEatenProducts,
  deleteEatenProducts,
  getEatenProducts,
};
