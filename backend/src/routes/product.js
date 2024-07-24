const { verifyTokenAndDistributor,verifyTokenAndEditProductAuthorization } = require("../middleware/verifyToken");
const router = require("express").Router();
const productController = require("../controllers/productController");
const verifyId = require("../middleware/verifyId");


//CREATE
router.post("/add", verifyTokenAndDistributor,productController.createProduct); 
//UPDATE
router.put("/edit", verifyId,verifyTokenAndEditProductAuthorization,productController.updateProduct);
//DELETE
router.delete("/delete",verifyId, verifyTokenAndEditProductAuthorization, productController.deleteProduct);
//GET PRODUCT BY ID
router.get("/find",verifyId,productController.getProduct);
// GET ALL PRODUCTS
router.get("/findAll", productController.getAllProducts);




module.exports = router;    