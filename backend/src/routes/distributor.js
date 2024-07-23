
const { verifyTokenAndEditDistributorAuthorization } = require("../middleware/verifyToken");
const distributorController = require("../controllers/DistributorController/distributorController");

const router = require("express").Router();
//UPDATE
router.put("/edit",verifyTokenAndEditDistributorAuthorization,distributorController.updateDistributor);
//GET DISTRIBUTOR
router.get("/find",verifyTokenAndEditDistributorAuthorization,distributorController.getDistributor);


module.exports = router;