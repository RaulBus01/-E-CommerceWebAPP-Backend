const mongoose = require('mongoose');


const CartSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    products: {
        
            productId: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },

        
    },
        
    
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
    