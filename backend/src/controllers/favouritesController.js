const Favourites = require("../models/Favourites");
const mongoose = require('mongoose');

exports.createFavourites = async (req, res) => {
  const newFavourites = new Favourites({ products: [], userId: req.body.id });
  try {
    const savedFavourites = await newFavourites.save();
    res.status(200).json(savedFavourites);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.addFavourites = async (req, res) => {
  try {
    const favourites = await Favourites.findOne({ userId: req.body.id });

    if (!favourites) {
      res.status(404).json("Favourites list not found");
      return;
    }
    console.log(favourites.products);


    const product = favourites.products.find(p => p.productId.equals(req.body.productId));
    if (product) {
      return res.status(400).json("Product already in favourites");
    }
    favourites.products.push({ productId: req.body.productId });
    const updatedFavourites = await favourites.save();
    res.status(200).json(updatedFavourites);

  } catch (err) {
    res.status(500).json(err);
  }
};


exports.deleteProductFromFavourites = async (req, res) => {
  try {
    const favourites = await Favourites.findOne({ userId: req.body.id });
    if (!favourites) {
      res.status(404).json("Favourites list not found");
      return;
    }


    await favourites.updateOne({ $pull: { products: { productId: req.body.productId } } });
    res.status(200).json("Product has been deleted from favourites");
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.deleteAllFavourites = async (req, res) => {
  try {
    const favourites = await Favourites.findOne({ userId: req.body.id });

    if (!favourites) {
      res.status(404).json("Favourites list not found");
      return;
    }
    if (favourites.products.length === 0) {
      res.status(400).json("Favourites list is already empty");
      return;
    }

    favourites.products = [];
    await favourites.save();
    res.status(200).json("Favourites list items have been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getFavourites = async (req, res) => {
  try {
    const favourites = await Favourites.findOne({ userId: req.params.id }).populate('products.productId');

    if (!favourites) {
      res.status(404).json("Favourites list not found");
      return;
    }
    res.json(favourites.products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAllFavourites = async (req, res) => {
  try {
    const favourites = await Favourites.find().populate('products.productId');
    res.json(favourites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
