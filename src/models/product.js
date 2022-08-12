const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
    rate: {
        type: Number,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
})

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: RatingSchema,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
