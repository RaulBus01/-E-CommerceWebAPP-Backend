const mongoose = require('mongoose');


const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    products: {
        type: Array,
    },
}, { timestamps: true });

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
    