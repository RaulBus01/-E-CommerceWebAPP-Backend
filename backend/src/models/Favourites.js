const mongoose = require("mongoose");

const FavouritesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  products: {
    productId: {
      type: String,
      required: true,
      unique: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
});

const Favourites = mongoose.model("Favourites", FavouritesSchema);
module.exports = Favourites;
