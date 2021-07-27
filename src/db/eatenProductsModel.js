const mongoose = require("mongoose")

const eatenProductsSchema = new mongoose.Schema({
  owner: {
    type: String ||  mongoose.Schema.Types.ObjectId,
    required: [true, "Provide user id"],
    unique: true
  },
  eatenProducts: [{
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
