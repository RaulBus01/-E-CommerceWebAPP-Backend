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
            }
    },
    status: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address : {
        country: {
            type: String,
            required: true,
        },
        county:{
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        number: {
            type: String,
            required: true,
        },
        zip: {
            type: String,
            required: true,
        },
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    distributorId: {
        type: String,
        required: true,
    }
    
}, {timestamps: true});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
    