const router = require('express').Router();
const distributorController = require('../../controllers/DistributorController/authDistributorController');


//Register Distributor
router.post('/register', distributorController.registerDistributor);


//Login Distributor
router.post('/login', distributorController.loginDistributor );


module.exports = router;