const mongoose = require('mongoose');


const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    products: [
        {
            productId: {
                type: String,
                required: true,
                unique: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
            price: {
                type: Number,
                required: true,
            },
        }
    ],
}, { timestamps: true });

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
    