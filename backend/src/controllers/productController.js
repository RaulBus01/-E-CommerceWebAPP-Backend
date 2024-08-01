const Product = require('../models/Product');
const Review = require('../models/Review');

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
        const product = await Product.findById(req.body.id);
        if(!product){
            res.status(404).json("Product not found");
            return;
        }
        const updatedProduct = product.updateOne({
            $set: req.body,
        });


        const savedProduct = await updatedProduct.save();
        res.status(200).json(savedProduct);
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
        const product = await Product.findById(req.params.id);
       
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);  
    }
}
exports.getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.find({
            category: {
                $in: [req.params.category],
            },
        });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.getProductsByDistributor = async (req, res) => {
    try {
        const products = await Product.find({ distributorId: req.params.id })
        .populate('reviews')
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
}