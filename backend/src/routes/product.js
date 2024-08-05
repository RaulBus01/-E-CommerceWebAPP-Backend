const { verifyTokenAndDistributor,verifyTokenAndEditProductAuthorization, verifyTokenAndAuthorizedDistributor } = require("../middleware/verifyToken");
const router = require("express").Router();
const productController = require("../controllers/productController");



//CREATE
router.post("/add", verifyTokenAndAuthorizedDistributor,productController.createProduct); 
//UPDATE
router.put("/edit", verifyTokenAndEditProductAuthorization,productController.updateProduct);
//DELETE
router.delete("/delete/:productId", verifyTokenAndEditProductAuthorization, productController.deleteProduct);
//GET PRODUCT BY ID
router.get("/find/:id", productController.getProduct);
// GET ALL PRODUCTS
router.get("/findAll", productController.getAllProducts);
//GET PRODUCTS BY CATEGORY
router.get("/findCategory/:category", productController.getProductsByCategory);
//GET PRODUCTS BY DISTRIBUTOR
router.get("/findDistributor/:id", verifyTokenAndDistributor, productController.getProductsByDistributor);





module.exports = router;    