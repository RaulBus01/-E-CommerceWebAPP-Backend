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
        const userId = req.params.id || req.body.id || req.body.userId;

        if (req.user.id === userId)
        {
            next();
        } else
        {
            res.status(403).json("You can only update your account");
        }
    });
}
const verifyTokenAndCustomer = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === "customer")
        {
            next();
        } else
        {
            res.status(403).json("You are not a customer");
        }

    });
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === "admin")
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
     
        if (req.user.role === "distributor")
        {
            next();
        } else
        {
            res.status(403).json("You are not an authorized distributor");
        }
    });
}
const verifyTokenAndAuthorizedDistributor = async (req, res, next) => {
    verifyToken(req, res,async  () => {
        if (req.user.role === 'distributor')
        {
            const distributor = await User.findById(req.user.id).populate("distributorInfo");
            if (!distributor)
            {
                return res.status(404).json("Distributor not found");
            }
            if(!distributor.distributorInfo.isAuthorized)
            {  
                return res.status(403).json("You are not an authorized distributor");
            }
            next();
        } else
        {
            res.status(403).json("You are not an authorized distributor");
        }
    });
}
const verifyTokendAndAssociatedDistributor = async (req, res, next) => {
    verifyToken(req, res, async () => {
        try {
            if (req.user.isDistributor) {
                const distributor = await Distributor.findById(req.user.id);
                if (!distributor) {
                    return res.status(404).json("Distributor not found");
                }
                const orders = await Order.find({'products.distributorId': req.user.id});
                if (orders.length > 0) {
                    return next();
                }
                else
                {
                    return res.status(403).json("You are not associated with any orders");
                }
            }
            
            res.status(403).json("You are not authorized to edit this order");
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    );
}
                

const verifyTokenAndCancelOrderAuthorization = async (req, res, next) => {
    verifyToken(req, res, async () => {
        try {
            const order = await Order.findById(req.params.id);
            if (!order) {
                return res.status(404).json("Order not found");
            }
            if (req.user.role === "admin") {
                return next();
            }
            if (req.user.role === "distributor") {
                
                if (order.distributorId === req.user.id) {
                    return next();
                }
            }
            if (req.user.id === order.userId) {
                return next();
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
        
            const order = await Order.findById(req.params.id); 
            if (!order) {
                return res.status(404).json("Order not found");
            }
            if (req.user.isDistributor) {
                const product = await Product.findById(order.products[0].product);
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
            if (!product) {
                return res.status(404).json("Product not found");
            }
            if (req.user.role === "admin") {
                return next();
            }
            if (req.user.role === "distributor" && product.distributor.toString() === req.user.id) 
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
        const userId = req.params.userId || req.body.userId;
           if(!userId)
              {
                    return res.status(403).json("Your id is not valid");
                }
            if(req.user.id !== userId)
            {
                return res.status(403).json("You are not authorized to do this");
            }

            const user = await User.findById(userId);
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
            if(verifyTokenAndUserAuthorization && req.user.isDistributor === false)
            {
                return next();
            }
            res.status(403).json("You are not authorized to reply to this question");
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
   
    
}
const verifyOrderOwnership = async (req, res, next) => {
    const userId = req.user.id; 
    const orderId = req.params.id;
 

    try {
        const order = await Order.findById(orderId); 
      

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (order.userId.toString() === userId || order.distributorId.toString() === userId) {
            return next();
        }

        res.status(403).json({ message: 'Access denied' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};




module.exports = {verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin,verifyTokenAndDistributor,verifyTokenAndCustomer,verifyTokenAndEditProductAuthorization,verifyTokenAndCancelOrderAuthorization,verifyTokenAndEditOrderStatusAuthorization, verifyTokenAndEditDistributorAuthorization, verifyTokenAndUserAuthorization, verifyTokenAndReplyAuthorization,verifyTokenAndAuthorizedDistributor,verifyTokendAndAssociatedDistributor,verifyOrderOwnership};
