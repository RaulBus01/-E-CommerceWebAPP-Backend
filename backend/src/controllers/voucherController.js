const Voucher = require('../models/Voucher');

exports.createVoucher = async (req, res) => {
    const newVoucher = new Voucher(req.body);
    try {
        const voucher = await Voucher.findOne({email: req.body.email,});
        if (voucher) {
            res.status(404).json("You already have a voucher");
            return;
        }
        const savedVoucher = await newVoucher.save();
        res.status(200).json(savedVoucher);
    } catch (err) {
        res.status(500).json(err);
    }
}
exports.updateVoucher = async (req, res) => {
    try {
        const voucher = await Voucher.findOne({email: req.body.email,});
        if (!voucher) {
            res.status(404).json("Voucher not found");
            return;
        }
        
        if(voucher.isActive === false){
            res.status(404).json("Voucher is already used");
            return;
        }

        const updatedVoucher = await Voucher.findByIdAndUpdate(voucher._id, {
            $set: {isActive: false},
        }, { new: true });
        
        res.status(200).json(updatedVoucher);
    } catch (err) {
        res.status(500).json(err);
    }
}
exports.getAllVouchers = async (req, res) => {
    try {
        const vouchers = await Voucher.find();
        res.json(vouchers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.getVoucher = async (req, res) => {
    try {
        const voucher = await Voucher.findOne({email: req.params.email});
        res.json(voucher);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}