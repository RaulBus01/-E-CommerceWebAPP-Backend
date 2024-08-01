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
        const alreadyReviewed = await Review.findOne({product: productId, user: userId});
        if(alreadyReviewed){
            res.status(400).json("You already reviewed this product!");
            return;
        }
        const newReview = new Review({
            product: productId,
            user: userId,
            rating,
            content
        });
        await newReview.save();
        
        const reviews = await Review.find({product: productId});
        const totalRating = reviews.reduce((accumulator, review) => accumulator + review.rating, 0);
        const newRating = reviews.length > 0 ? totalRating/reviews.length : 0;
        product.ratingProduct = newRating;
        product.numberOfReviews = reviews.length;
        await product.save();

        res.status(200).json(product);
    } catch(error){
        res.status(500).json(error);
    }
}

exports.getReviewsByProduct = async (req, res) => {
    try{
        const product = await Product.findById(req.params.productId);
        if(!product){
            res.status(404).json("Product not found!");
            return;
        }
        const reviews = await Review.find({product: req.params.productId}).populate('user');
        reviews.map(review => {
            const {password, ...others} = review.user._doc;
            review.user = others;
            return review;
        });
        res.status(200).json(reviews);
    }catch(error){
        res.status(500).json(error);
    }
}

exports.getReviews = async (req, res) => {
    try{
        let reviews;
        if(req.user.role === 'admin'){
            reviews = await Review.find().populate('product').populate('user');
        }
        if(req.user.role === 'customer'){
            reviews = await Review.find({user: req.user.id}).populate('product').populate('user');
        }
        if(req.user.role === 'distributor'){
            reviews = await Review.find({user: req.user.id}).populate('product').populate('user');
        }

        if(reviews.length === 0){
            res.status(404).json("No reviews found!");
            return;
        }
        if(reviews > 1){
            reviews.map(review =>{
                const {name,role} = review.user._doc;
                review.user = {name,role};
                return review;
            })
        }res.status(200).json(reviews);

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