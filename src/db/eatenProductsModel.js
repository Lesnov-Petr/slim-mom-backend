const mongoose = require("mongoose");

const eatenProductsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Set title for product"]
  },
  calories: {
    type: String,
    required: [true, "Set calories for the amount of eaten product"]
  },
  weight: {
    type: String,
    required: [true, "Set weight of eaten product"]
  },
});

const EatenProducts = mongoose.model("EatenProducts", eatenProductsSchema);

module.exports = {
  EatenProducts
};
