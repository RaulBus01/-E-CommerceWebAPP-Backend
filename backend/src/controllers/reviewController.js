const Product = require('../models/Product');
const Review = require('../models/Review');
const User = require('../models/User');

exports.addReviewToProduct = async (req, res) => {
    try{
        const { productId, userId, rating, content } = req.body;
        
        const product = await Product.findById(productId);
        if(!product){
            res.status(404).json("Product not found");
            return;
        }
        const alreadyReviewed = await Review.findOne({productId, userId});
        if(alreadyReviewed){
            res.status(400).json("You already reviewed this product!");
            return;
        }
        //the new review
        const newReview = new Review({
            productId,
            userId,
            rating,
            content
        });
        await newReview.save();
        
        //update product rating
        const reviews = await Review.find({productId});
        const totalRating = reviews.reduce((accumulator, review) => accumulator + review.rating, 0);
        const newRating = reviews.length > 0 ? totalRating/reviews.length : 0;
        product.ratingProduct = newRating;
        await product.save();

        res.status(200).json(product);
    } catch(error){
        res.status(500).json(error);
    }
}
exports.getReviewsByProduct = async (req, res) => {
    try{
        const product = await Product.findById(req.body.productId);
        if(!product){
            res.status(404).json("Product not found!");
            return;
        }
        const reviews = await Review.find({productId: req.body.productId});
        res.status(200).json(reviews);
    }catch(error){
        res.status(500).json(error);
    }
}
exports.getReviewsByUser = async (req, res) => {
    try{
        const user = await User.findById(req.body.userId);
        if(!user){
            res.status(404).json("User not found!");
            return;
        }
        const reviews = await Review.find({userId: req.body.userId});
        res.status(200).json(reviews);
    }catch(error){
        res.status(500).json(error);
    }
}
exports.deleteReview = async (req, res) => {
    try{
        await Review.findByIdAndRemove(req.body.id);
        res.status(200).json("Review deleted successfully!");
    }catch(error){
        res.status(500).json(error);
    }
}