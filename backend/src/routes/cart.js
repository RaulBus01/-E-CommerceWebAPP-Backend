
const {verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('../middleware/verifyToken');
const router = require('express').Router();
const cartController = require('../controllers/cartController');


//CREATE
router.post("/create",verifyTokenAndAuthorization,cartController.createCart);
//UPDATE
router.put("/add",verifyTokenAndAuthorization,cartController.addProductToCart);
//DELETE
router.delete("/deleteAll",verifyTokenAndAuthorization,cartController.deleteCart);
//DELETE PRODUCT FROM CART
router.delete("/deleteProduct",verifyTokenAndAuthorization,cartController.deleteProductFromCart);
//GET CART BY USER ID
router.get("/find/:id",verifyTokenAndAuthorization,cartController.getCart);
// GET ALL CARTS
router.get("/findAll",verifyTokenAndAdmin,cartController.getAllCarts);
//EDIT QUANTITY IN CART
router.put("/edit",verifyTokenAndAuthorization,cartController.editProductQuantityInCart);

module.exports = router;    