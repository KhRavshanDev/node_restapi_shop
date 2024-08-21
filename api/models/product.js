const { Schema, model } = require("mongoose");

const productSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
});

module.exports = model("Product", productSchema);
