const mongoose = require("mongoose")

const eatenProductsSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: [true, "Provide user id"],
    unique: true
  },
  eatenProducts: [{
     title: {
      type: String,
      required: [true, "Set title for product"]
    },
    calories: {
      type: Number,
      required: [true, "Set calories for the amount of eaten product"]
    },
    weight: {
      type: Number,
      required: [true, "Set weight of eaten product"]
    },
    date: {
      type: String,
      required: [true, "Set date"]
    },
  }]
});

const EatenProducts = mongoose.model("EatenProducts", eatenProductsSchema);

module.exports = {
  EatenProducts
};
