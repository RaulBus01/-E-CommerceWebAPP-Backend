const Category = require('../models/Category');
const Product = require('../models/Product');
const Review = require('../models/Review');

exports.createProduct = async (req, res) => {

    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        categories: req.body.categories,
        description: req.body.description,
        image: req.body.image,
        stock: req.body.stock,
        distributor: req.user.id,
    });
    
    try {
        const categoryExists = await Category.findById(req.body.categories);
        if (!categoryExists) {
            return res.status(400).json("Category does not exist");
        }
        
    
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
}
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.body.productId);
        if(!product){
            res.status(404).json("Product not found");
            return;
        }
        if (req.body.hasOwnProperty("distributorId")) {
            return res.status(403).json("You are not authorized to edit the distributorId field");
        }
        console.log(product);
        Object.keys(req.body).forEach((key) => {
            product[key] = req.body[key];
        });
        const savedProduct = await product.save();
        console.log(savedProduct);
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
}
exports.deleteProduct = async (req, res) => {
        try {
            console.log(req.params.productId);
            await Product.findByIdAndDelete(req.params.productId);
            res.status(200).json("Product has been deleted");
        } catch (err) {
            res.status(500).json(err);  
    }
}
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("distributor", "name").populate("categories", "name");
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("distributor", "name").populate("reviews").populate("questions");
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
       
        const products = await Product.find()
            .populate("distributor", "name")
            .populate("categories", "name")
            .populate("reviews")
            .populate("questions");

    
        let userId;
        if(req.user.role === 'customer'){
            userId = req.params.id;
        }
        if(req.user.role === 'distributor'){
            userId = req.user.id;
        }
   
        const filteredProducts = products.filter((product) => {
            
             return product.distributor._id.toString() === userId
       
        });

        console.log(filteredProducts);

        res.status(200).json(filteredProducts);
    } catch (err) {
        res.status(500).json(err);
    }
}