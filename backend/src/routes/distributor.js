
const { verifyTokenAndEditDistributorAuthorization,verifyTokenAndDistributor } = require("../middleware/verifyToken");
const distributorController = require("../controllers/DistributorController/distributorController");

const router = require("express").Router();
//UPDATE
router.put("/edit",verifyTokenAndEditDistributorAuthorization,distributorController.updateDistributor);
//GET DISTRIBUTOR
router.get("/find/:id",verifyTokenAndDistributor,distributorController.getDistributor);


module.exports = router;