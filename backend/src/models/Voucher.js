const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    isActive:{
        type: Boolean,
        default: true,
    }
});

const Voucher = mongoose.model('Voucher', voucherSchema);
module.exports = Voucher;
