const Favourites = require("../models/Favourites");

exports.createFavourites = async (req, res) => {
  const newFavourites = new Favourites(req.body);
  try {
    const savedFavourites = await newFavourites.save();
    res.status(200).json(savedFavourites);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateFavourites = async (req, res) => {
  try {
    // const favourites = await Favourites.findById(req.params.id);
    // if (favourites.products.includes(req.body.productId)) {
    //     res.status(400).json("Product already exists in the favourites list");
    //     return;
    // }
    const updatedFavourites = await Favourites.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { products: req.body.productId },
      },
      { new: true }
    );
    res.status(200).json(updatedFavourites);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteProductFromFavourites = async (req, res) => {
  try {
    const favourites = await Favourites.findOne({ user: req.params.userId });

    if (!favourites) {
      res.status(404).json("Favourites list not found");
      return;
    }

    await favourites.updateOne({ $pull: { products: req.params.productId } });
    res.status(200).json("Product has been deleted from favourites");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteFavourites = async (req, res) => {
  try {
    const favourites = await Favourites.findOne({ user: req.params.userId });

    if (!favourites) {
      res.status(404).json("Favourites list not found");
      return;
    }

    await Favourites.updateOne(
      { user: req.params.userId },
      { $set: { items: [] } }
    );
    res.status(200).json("Favourites list items have been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getFavourites = async (req, res) => {
  try {
    const favourites = await Favourites.findOne({
      user: req.params.userId,
    }).populate("products");

    if (!favourites) {
      res.status(404).json("Favourites list not found");
      return;
    }
    res.json(favourites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllFavourites = async (req, res) => {
  try {
    const favourites = await Favourites.find().populate("user products");
    res.json(favourites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
