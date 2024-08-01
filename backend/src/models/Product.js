const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }], 
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    stock:
    {
        type: Number,
        required: true,
    },
    distributor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    ratingProduct: {
        type: Number,
        required: false,
    },
    numberOfReviews: {
        type: Number,
        required: false,
    },
}, {timestamps: true});
productSchema.virtual('reviews',{
    ref: 'Review',
    localField: '_id',
    foreignField: 'productId'
});

productSchema.set('toObject', { virtuals: true });
productSchema.set('toJSON', { virtuals: true });

productSchema.virtual('questions',{
    ref: 'Question',
    localField: '_id',
    foreignField: 'productId'
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

// const subcategories = await Category.find({ parent: someCategory._id });
//const categoryAndSubcategories = await Category.find({
//     $or: [{ _id: someCategory._id }, { parent: someCategory._id }]
// });
// const categoryIds = categoryAndSubcategories.map(cat => cat._id);
// const products = await Product.find({ categories: { $in: categoryIds } });