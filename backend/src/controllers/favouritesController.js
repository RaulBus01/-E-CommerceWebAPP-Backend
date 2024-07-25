const Favourites = require("../models/Favourites");

exports.createFavourites = async (req, res) => {
  const newFavourites = new Favourites({products:[], userId: req.body.id });
  try {
    const savedFavourites = await newFavourites.save();
    res.status(200).json(savedFavourites);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addFavourites = async (req, res) => {
  try {

    const favourites = await Favourites.findOne(
      { userId: req.body.id },  
    );
    
    if(!favourites || favourites === null){
      res.status(404).json("Favourites list not found");
      return;
    }
    const product = await favourites.products.find((product) => product === req.body.productId);
    if(product){
      res.status(400).json("Product already in favourites");
      return;
    }
    const updatedFavourites = await Favourites.findByIdAndUpdate(
      favourites._id,
      { $push: { products: req.body.productId } },
      { new : true }
    );
    const savedFavourites = await updatedFavourites.save();
    res.status(200).json(savedFavourites);
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

    await favourites.updateOne({ $pull: { products: req.body.productId } });
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
    if(favourites.products.length === 0){
      res.status(400).json("Favourites list is already empty");
      return;
    }

    await Favourites.updateOne(
      { $set: { products: [] } }
    );
    res.status(200).json("Favourites list items have been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getFavourites = async (req, res) => {
  try {
    const favourites = await Favourites.findOne({
      userId: req.params.id,
    });

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
    const favourites = await Favourites.find()
    res.json(favourites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
