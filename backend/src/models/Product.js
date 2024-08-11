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
    brand: {
        type: String,
        required: true,
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }], 
    brand:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    
    images: [
        {
            type: String,
            required: true,
        },
    ],
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
    isActive:{
        type: Boolean,
        default: true,
        
    },
    
}, {timestamps: true});
productSchema.virtual('reviews',{
    ref: 'Review',
    localField: '_id',
    foreignField: 'product'
});

productSchema.set('toObject', { virtuals: true });
productSchema.set('toJSON', { virtuals: true });

productSchema.virtual('questions',{
    ref: 'Question',
    localField: '_id',
    foreignField: 'product'
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;