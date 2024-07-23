const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
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
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirm_password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: false,
    },
    address: {
        country: {
            type: String,
            required: false,
        },
        county:{
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: false,
        },
        street: {
            type: String,
            required: false,
        },
        number: {
            type: String,
            required: false,
        },
        zip: {
            type: String,
            required: false,
        },


    }

    }, {timestamps: true});


const User = mongoose.model('User', userSchema);

module.exports = User;