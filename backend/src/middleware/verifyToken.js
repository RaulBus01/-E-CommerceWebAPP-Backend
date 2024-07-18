const jwt = require("jsonwebtoken");


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
        if (req.user.id === req.params.id)
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
const verifyTokenAndDeleteProductAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin || req.user.isDistributor)
        {
            next();
        } else
        {
            res.status(403).json("You are not allowed to delete products");
        }
    });
}
module.exports = {verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin,verifyTokenAndDistributor,verifyTokenAndDeleteProductAuthorization};

