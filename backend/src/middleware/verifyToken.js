const jwt = require("jsonwebtoken");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Distributor = require("../models/Distributor");
const User = require('../models/User');
const Question = require("../models/Question");

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
const verifyTokenAndDistributor = async (req, res, next) => {
    verifyToken(req, res,async  () => {
        console.log(req.user);
        if (req.user.isDistributor)
        {
            const distributor = await Distributor.findById(req.user.id);
            if (!distributor)
            {
                return res.status(404).json("Distributor not found");
            }
            console.log(distributor);
            if(!distributor.isAuthorized)
            {
                console.log("You are not an authorized distributor");
                return res.status(403).json("You are not an authorized distributor");
            }
            


            next();
        } else
        {
            res.status(403).json("You are not an authorized distributor");
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
            const product = await Product.findById(req.body.id);
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

const verifyTokenAndEditDistributorAuthorization = (req, res, next) => {
    verifyToken(req, res, async () => {
        try {
            if(req.user.id !== req.body.id)
            {
                return res.status(403).json("You are not authorized to edit this distributor");
            }
            const distributor = await Distributor.findById(req.body.id);
            if (!distributor) {
                return res.status(404).json("Distributor not found");
            }
            
            if (req.user.isDistributor) {
                return next();
            }
            res.status(403).json("You are not authorized to edit this distributor");
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    );
}
const verifyTokenAndUserAuthorization = (req, res, next) => {
    verifyToken(req, res, async () => {
        try {
            
            if(req.user.id !== req.body.userId)
            {
                return res.status(403).json("You are not authorized");
            }
            const user = await User.findById(req.body.userId);
            if (!user) {
                return res.status(404).json("User not found");
            }
            
            if (req.user.id === user.id) {
                return next();
            }
            res.status(403).json("You are not authorized to do this");
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    );
}
const verifyTokenAndReplyAuthorization = (req, res, next) => {
    verifyToken(req, res, async () => {
        try {
            const question = await Question.findById(req.body.questionId);
            if (!question) {
                return res.status(404).json("Question not found");
            }
            if (req.user.isAdmin) {
                return next();
            }
            if (req.user.isDistributor) {
                const product = await Product.findById(question.productId);
                if (product.distributorId === req.user.id) {
                    return next();
                }
            }
            if(verifyTokenAndUserAuthorization)
            {
                return next();
            }
            res.status(403).json("You are not authorized to reply to this question");
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}





module.exports = {verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin,verifyTokenAndDistributor,verifyTokenAndEditProductAuthorization,verifyTokenAndCancelOrderAuthorization,verifyTokenAndEditOrderStatusAuthorization, verifyTokenAndEditDistributorAuthorization, verifyTokenAndUserAuthorization, verifyTokenAndReplyAuthorization};

