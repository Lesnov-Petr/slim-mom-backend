const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  title: {
    type: Object,
    required: [true, "Set title for product"]
  },
  calories: {
    type: Number,
    required: [true, "Indicate calories per 100 grams"]
  },
  weight: {
    type: Number,
  },
  groupBloodNotAllowed: {
    type: Array
  },
  categories: {
    type: Array
  }
});

const Products = mongoose.model("Products", productsSchema);

module.exports = {
  Products
};
