
const {verifyTokenAndAuthorization,verifyTokenAndAdmin, verifyToken } = require('../middleware/verifyToken');
const router = require('express').Router();
const cartController = require('../controllers/cartController');

//CREATE
router.post("/add",verifyToken,cartController.createCart);
//UPDATE
router.patch("/edit/:id",verifyTokenAndAuthorization,cartController.updateCart);
//DELETE
router.delete("/delete/:id",verifyTokenAndAuthorization,cartController.deleteCart);
//DELETE PRODUCT FROM CART
router.delete("/deleteCartProduct/:id/:productId",verifyTokenAndAuthorization,cartController.deleteProductFromCart);
//GET CART BY USER ID
router.get("/find/:id",verifyTokenAndAdmin,cartController.getCart);
// GET ALL CARTS
router.get("/findAll",verifyTokenAndAdmin,cartController.getAllCarts);

module.exports = router;