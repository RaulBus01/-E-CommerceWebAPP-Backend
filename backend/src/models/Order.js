const mongoose = require('mongoose');


const OrderSchema= new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                default: 1,
            },
        }
    ],
    status: {
        type: String,
        required: true,
        enum: ['Pending','Processing','Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',
    },
     name: {
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
    paymentMethod: {
        type: String,
        required: true,
        enum: ['Cash On Delivery', 'Credit Card', 'Paypal'],
        default: 'Cash On Delivery',
    },
    distributor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      }
    
}, {timestamps: true});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
    