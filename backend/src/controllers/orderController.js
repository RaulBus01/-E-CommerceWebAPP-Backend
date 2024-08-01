const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

exports.createOrder = async (req, res) => {
    try {
        const products = req.body.products;
      
        const user = await User.findById(req.body.id).populate('customerInfo');
       
        if (!user) {
            return res.status(400).json("User not found");
        }
        if(!user.customerInfo.isVerified){
            return res.status(400).json("User is not verified");
        }
        if (!products || products.length === 0) {
            return res.status(400).json("No products in cart");
        }

        let totalPrice = 0;
        const ordersByDistributor = new Map();

        for (const product of products) {
            if (product.product.length !== 24)
            {
                return res.status(400).json(`Product ID is not valid`);
            }
            const checkProduct = await Product.findById(product.product);
            if (!checkProduct) {
                return res.status(400).json(`Product not found: ${product.product}`);
            }

            // Uncomment if you want to check stock
            if (checkProduct.stock < product.quantity) {
                return res.status(400).json(`Product out of stock: ${product.product}`);
            }

            const { price, distributorId } = checkProduct;
            totalPrice += price * product.quantity;

            if (!ordersByDistributor.has(distributorId)) {
                ordersByDistributor.set(distributorId, {
                    products: [],
                    totalPrice: 0
                });
            }
            
            ordersByDistributor.get(distributorId).products.push(product);
            ordersByDistributor.get(distributorId).totalPrice += price * product.quantity;
        }

        const orders = [];
        for (const [distributorId, orderData] of ordersByDistributor) {
            const newOrder = new Order({
                userId: req.body.id,
                products: orderData.products,
                name: req.body.name,
                email: req.user.email,
                phoneNumber: req.body.phoneNumber,
                address: {
                    country: req.body.address.country,
                    county: req.body.address.county,
                    city: req.body.address.city,
                    street: req.body.address.street,
                    number: req.body.address.number,
                    zip: req.body.address.zip,
                },
                totalPrice: orderData.totalPrice,
                distributorId: distributorId,
            });
            orders.push(await newOrder.save());
        }

        res.status(201).json({
            message: "Orders created successfully",
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.cancelOrder = async(req, res) => {
    try{
        const order = await Order.findById(req.params.id);
        
        if(!order){
            res.status(404).json("Order not found");
            return;
        }
        if (order.status === "Delivered") {
            return res.status(400).json("Order is already delivered");
           
        }
        if (order.status === "Shipped") {
            return res.status(400).json("Order is already shipped");
           
        }
        if (order.status === "Cancelled") {
            return res.status(400).json("Order is already cancelled");
           
        }
        order.status = "Cancelled";
        await order.save();

        res.status(200).json({message: "Order cancelled "});
    } catch(error){
        res.status(500).json(error);
    }
}

exports.getAllOrders = async(req, res) => {
    try{
     
        const orders = await Order.find();
        
        res.status(200).json(orders);
    } catch(error){
        res.status(500).json(error);
        
    }
}



exports.editOrderStatus = async(req, res) => {
    try{
        const order = await Order.findById(req.params.id);
        if(!order){
            res.status(404).json("Order not found");
            return;
        }
        if(order.status === "delivered"){
            res.status(400).json("Order is already delivered");
            return;
        }
        if(order.status === "cancelled"){
            res.status(400).json("Order is cancelled");
            return;
        }
    
        order.status = req.body.status;

       const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);
    } catch(error){
        res.status(500).json(error);
    }
}

exports.getOrder = async(req, res) => {
    try{
        const order = await Order.findById(req.params.id).populate('products.product');
        if(!order){
            return res.status(404).json("Order not found");
            
        }
        if(req.user.role === 'admin'){
            return res.status(200).json(order);
        }
        if(order.userId !== req.user.id || order.distributorId !== req.user.id){
            return res.status(401).json("You are not authorized to view this order");
        }
        res.status(200).json(order);
    } catch(error){
        res.status(500).json(error);
    }
}
exports.getOrdersByDistributor = async(req, res) => {
    try{
        const orders = await Order.find({distributorId: req.params.id});
        res.status(200).json(orders);
    } catch(error){
        res.status(500).json(error);
    }
}

