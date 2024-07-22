
const {verifyTokenAndAuthorization,verifyTokenAndAdmin, verifyToken } = require('../middleware/verifyToken');
const router = require('express').Router();
const cartController = require('../controllers/cartController');

//CREATE
router.post("/add/:id",verifyTokenAndAuthorization,cartController.createCart);
//UPDATE
router.put("/edit/:id",verifyTokenAndAuthorization,cartController.addProductToCart);
//DELETE
router.delete("/delete/:id",verifyTokenAndAuthorization,cartController.deleteCart);
//DELETE PRODUCT FROM CART
router.delete("/deleteCartProduct/:id/:productId",verifyTokenAndAuthorization,cartController.deleteProductFromCart);
//GET CART BY USER ID
router.get("/find/:id",verifyTokenAndAdmin,cartController.getCart);
// GET ALL CARTS
router.get("/findAll",verifyTokenAndAdmin,cartController.getAllCarts);

module.exports = router;