const mongoose = require("mongoose");

const FavouritesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  products: {
    type: Array,
  },
});

const Favourites = mongoose.model("Favourites", FavouritesSchema);
module.exports = Favourites;
