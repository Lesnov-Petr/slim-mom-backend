const {
  searchProducts,
  publicRecommendation,
  privateRecommendation,
  postEatenProducts,
  deleteEatenProducts,
  getEatenProducts
} = require('../services/productsServices')

const searchProductsController = async (req, res) => {
  const { query } = req.query
  const productsList = await searchProducts(query)
  res.json({message: 'success', productsList})
}

const publicRecommendationController = async (req, res) => {
  const {
    height,
     weight,
     age,
     desiredWeight,
     bloodGroup } = req.body
  const recommendation =  await publicRecommendation({
    height,
     weight,
     age,
     desiredWeight,
     bloodGroup })
  res.json({message: 'success', recommendation})
}

const privateRecommendationController = async (req, res) => {
  
}

const addEatenProductsController = async (req, res) => {
  const { userId } = req.params
  const { title, weight, calories, date } = req.body
  const savedProduct = await postEatenProducts({ title, weight, calories, date, userId })
  res.json({message: 'success', savedProduct})
}

const deleteEatenProductsController = async (req, res) => {
  
}

const getEatenProductsController = async (req, res) => {
  
}

module.exports = {
  searchProductsController,
  publicRecommendationController,
  privateRecommendationController,
  addEatenProductsController,
  deleteEatenProductsController,
  getEatenProductsController,
}
