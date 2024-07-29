const mongoose = require("mongoose");

const FavouritesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  products: [
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
     
    },
],
}, { timestamps: true });

const Favourites = mongoose.model("Favourites", FavouritesSchema);
module.exports = Favourites;
