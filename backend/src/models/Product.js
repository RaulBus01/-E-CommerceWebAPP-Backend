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
    category: {
        type: [String]
        
    },
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
    distributorId: {
        type: String,
        required: true,
    },
    ratingProduct: {
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
