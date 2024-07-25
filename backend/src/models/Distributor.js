const mongoose = require('mongoose');
const DistributorSchema = new mongoose.Schema({
    name : {
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
        required: true,
    },
    address: {
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
    CUI: {
        type: String,
        required: true,
        unique: true,
    },
    isDistributor: {
        type: Boolean,
        default: true,
    },
    isAuthorized: {
        type: Boolean,
        default: false,
    }
    

    }, {timestamps: true});

const Distributor = mongoose.model('Distributor', DistributorSchema);

module.exports = Distributor;