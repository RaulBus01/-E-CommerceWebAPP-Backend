const jwt = require("jsonwebtoken");
const Order = require("../models/Order");
const Product = require("../models/Product");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (!authHeader)
    {
        return res.status(401).json("You are not authenticated");
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err)
        {
            return res.status(403).json("Token is not valid");
        }
        req.user = user;
        next();
    });


}
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        
        if (req.user.id === req.params.id || req.user.id === req.body.id)
        {
            next();
        } else
        {
            res.status(403).json("You can only update your account");
        }
    });
}
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin)
        {
            next();
        } else
        {
            res.status(403).json("You are not admin");
        }
    });
}
const verifyTokenAndDistributor = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isDistributor)
        {
            next();
        } else
        {
            res.status(403).json("You are not a distributor");
        }
    });
}
const verifyTokenAndCancelOrderAuthorization = async (req, res, next) => {
    verifyToken(req, res, async () => {
        try {
            
            const order = await Order.findById(req.params.orderId);
          
            if (!order) {
                return res.status(404).json("Order not found");
            }

            
            if (req.user.id === order.orderId && !req.user.isDistributor) {
                return next();
            }   
    

            if (req.user.isDistributor) {
                
               
                const product = await Product.findById(order.products[0].productId);

                const isAssociatedDistributor = product.distributorId === req.user.id;

                
                if (isAssociatedDistributor) {
                    return next();
                }
            }

            
            res.status(403).json("You are not authorized to cancel this order");

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
};
const verifyTokenAndEditOrderStatusAuthorization = async (req, res, next) => {
    verifyToken(req, res, async () => {
        try {
            const order = await Order.findById(req.params.orderId);
            if (!order) {
                return res.status(404).json("Order not found");
            }
            if (req.user.isDistributor) {
                const product = await Product.findById(order.products[0].productId);
                const isAssociatedDistributor = product.distributorId === req.user.id;
                if (isAssociatedDistributor) {
                    return next();
                }
            }
            res.status(403).json("You are not authorized to edit this order");
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
const verifyTokenAndEditProductAuthorization = (req, res, next) => {
    verifyToken(req, res, async () => {
        try {
            const product = await Product.findById(req.body.productId);
            console.log(product);
            if (!product) {
                return res.status(404).json("Product not found");
            }
            if (req.user.isAdmin) {
                return next();
            }
            if (req.user.isDistributor && product.distributorId === req.user.id) 
            {
                return next();
              
            }
            res.status(403).json("You are not authorized to edit this product");
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
module.exports = {verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin,verifyTokenAndDistributor,verifyTokenAndEditProductAuthorization,verifyTokenAndCancelOrderAuthorization,verifyTokenAndEditOrderStatusAuthorization};

