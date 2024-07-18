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
    phoneNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    CUI: {
        type: String,
        required: true,
        unique: true,
    },
    isDistributor: {
        type: Boolean,
        default: true,
    }
    

    }, {timestamps: true});

const Distributor = mongoose.model('Distributor', DistributorSchema);

module.exports = Distributor;