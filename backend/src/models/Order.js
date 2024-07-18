const mongoose = require('mongoose');


const OrderSchema= new mongoose.Schema({
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
    status: {
        type: String,
        required: true,
    },
    adress : {
        type: String,
        required: true,
    },
    
        
    
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
    