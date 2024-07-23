const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
    try {
        const products = req.body.products;
        if (!products || products.length === 0) {
            return res.status(400).json("No products in cart");
        }

        let totalPrice = 0;
        const ordersByDistributor = new Map();

        for (const product of products) {
            if (product.productId.length !== 24)
            {
                return res.status(400).json(`Product ID is not valid`);
            }
            const checkProduct = await Product.findById(product.productId);
            if (!checkProduct) {
                return res.status(400).json(`Product not found: ${product.productId}`);
            }

            // Uncomment if you want to check stock
            if (checkProduct.stock < product.quantity) {
                return res.status(400).json(`Product out of stock: ${product.productId}`);
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
                userId: req.body.userId,
                products: orderData.products,
                status: "Pending",
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
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
        const order = await Order.findById(req.params.orderId);
        
        if(!order){
            res.status(404).json("Order not found");
            return;
        }
        if (order.status === "delivered") {
            res.status(400).json("Order is already delivered");
            return;
        }
        if (order.status === "cancelled") {
            res.status(400).json("Order is already cancelled");
            return;
        }
        await order.updateOne({$set: {status: "cancelled"}});

        res.status(200).json("Order has been cancelled");
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

exports.getOrdersByUser = async(req, res) => {
    try{
        const orders = await Order.find({userId: req.body.id});
        res.status(200).json(orders);
    } catch(error){
        res.status(500).json(error);
    }
}

exports.editOrderStatus = async(req, res) => {
    try{
        const editedOrder = await Order.findByIdAndUpdate(req.params.orderId,
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