const Product = require('../models/Product');

exports.createProduct = async (req, res) => {

    const newProduct = new Product(req.body);
    try {
        
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
}
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.body.id, {
            $set: req.body,
        }, { new: true });
        if(req.body.distributorId){
            res.status(403).json("You are not authorized to edit this field");
            return;
        }
        if (!updatedProduct) {
            res.status(404).json("Product not found");
            return;
        }
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
}
exports.deleteProduct = async (req, res) => {
        try {
            await Product.findByIdAndDelete(req.body.id);
            res.status(200).json("Product has been deleted");
        } catch (err) {
            res.status(500).json(err);
        
    }
}
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
}
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.body.id);
       
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);  
    }
}
