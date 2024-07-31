
const { verifyTokenAndEditDistributorAuthorization,verifyTokenAndDistributor, verifyTokenAndAuthorization } = require("../middleware/verifyToken");
const distributorController = require("../controllers/DistributorController/distributorController");

const router = require("express").Router();
//UPDATE
router.put("/edit",verifyTokenAndEditDistributorAuthorization,distributorController.updateDistributor);
//GET DISTRIBUTOR
router.get("/find/:id",verifyTokenAndAuthorization,distributorController.getDistributor);


module.exports = router;