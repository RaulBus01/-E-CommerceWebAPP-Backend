const { verifyTokenAndDistributor,verifyTokenAndEditProductAuthorization, verifyTokenAndAuthorizedDistributor } = require("../middleware/verifyToken");
const router = require("express").Router();
const productController = require("../controllers/productController");
const verifyId = require("../middleware/verifyId");


//CREATE
router.post("/add", verifyTokenAndAuthorizedDistributor,productController.createProduct); 
//UPDATE
router.put("/edit", verifyId,verifyTokenAndEditProductAuthorization,productController.updateProduct);
//DELETE
router.delete("/delete",verifyId, verifyTokenAndEditProductAuthorization, productController.deleteProduct);
//GET PRODUCT BY ID
router.get("/find/:id",verifyId,productController.getProduct);
// GET ALL PRODUCTS
router.get("/findAll", productController.getAllProducts);
//GET PRODUCTS BY DISTRIBUTOR
router.get("/findDistributor/:id",verifyId, verifyTokenAndDistributor, productController.getProductsByDistributor);




module.exports = router;    