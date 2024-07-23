const { verifyTokenAndDistributor,verifyTokenAndEditProductAuthorization } = require("../middleware/verifyToken");
const router = require("./eventRoutes");
const productController = require("../controllers/productController");


//CREATE
router.post("/add", verifyTokenAndDistributor,productController.createProduct); 
//UPDATE
router.put("/edit", verifyTokenAndEditProductAuthorization,productController.updateProduct);
//DELETE
router.delete("/delete", verifyTokenAndEditProductAuthorization, productController.deleteProduct);
//GET PRODUCT BY ID
router.get("/find",productController.getProduct);
// GET ALL PRODUCTS
router.get("/findAll", productController.getAllProducts);




module.exports = router;    