const mongoose = require('mongoose');


const OrderSchema= new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    products: {
        type: Array,
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
    address : {
        type: String,
        required: true,
    },
    
}, {timestamps: true});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
    