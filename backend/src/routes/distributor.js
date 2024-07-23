
const { verifyTokenAndEditDistributorAuthorization } = require("../middleware/verifyToken");
const distributor = require("../controllers/DistributorController/distributorController");

const router = require("express").Router();
//UPDATE
router.put("/edit",verifyTokenAndEditDistributorAuthorization,distributor.updateDistributor);
//GET DISTRIBUTOR
router.get("/find",verifyTokenAndEditDistributorAuthorization,distributor.getDistributor);


module.exports = router;