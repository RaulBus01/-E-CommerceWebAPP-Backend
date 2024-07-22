const Order = require('../models/Order');

exports.createOrder = async(req, res) => {
    const newOrder = new Order(req.body);

    try{
        const order = await newOrder.save();
        res.status(200).json(order);
    } catch(error){
        res.status(500).json(error);
    }
}

exports.cancelOrder = async(req, res) => {
    try{
        const order = await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted");
    } catch(error){
        res.status(500).json(error);
    }
}

exports.getAllOrders = async(req, res) => {
    try{
        const orders = await Order.find();
        res.status(200),json(orders);
    } catch(error){
        res.status(500).json(error);
    }
}

exports.getOrdersByUser = async(req, res) => {
    try{
        const orders = await Order.find({userId: req.params.id});
        res.status(200).json(orders);
    } catch(error){
        res.status(500).json(error);
    }
}

exports.editOrder = async(req, res) => {
    try{
        const editedOrder = await Order.findByIdAndUpdate(req.params.id,
            {
                $set: req.body,
            }, {new: true});
        res.status(200).json(editedOrder);
    } catch(error){
        res.status(500).json(error);
    }
}

exports.getOrder = async(req, res) => {
    try{
        const order = await Order.findById(req.params.id);
        res.status(200).json(order);
    } catch(error){
        res.status(500).json(error);
    }
}