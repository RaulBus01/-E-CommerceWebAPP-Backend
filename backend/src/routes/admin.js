const {verifyTokenAndAdmin } = require("../middleware/verifyToken");

const router = require("express").Router();
const AdminController = require("../controllers/AdminController/adminController");
//UPDATE USER
router.put("/edit",verifyTokenAndAdmin,AdminController.updateUser);
//DELETE USER
router.delete("/delete",verifyTokenAndAdmin, AdminController.deleteUser);
//GET USER
router.get("/findUser",verifyTokenAndAdmin,AdminController.getUser);

//GET ALL USERS
router.get("/findAllUsers",verifyTokenAndAdmin,AdminController.getAllUsers);

//GET DISTRIBUTOR
router.get("/findDistributor",verifyTokenAndAdmin,AdminController.getDistributor);
//GET ALL DISTRIBUTORS
router.get("/findAllDistributors",verifyTokenAndAdmin,AdminController.getAllDistributors);
//DELETE DISTRIBUTOR
router.delete("/deleteDistributor",verifyTokenAndAdmin,AdminController.deleteDistributor);
//UPDATE DISTRIBUTOR
router.patch("/editDistributor",verifyTokenAndAdmin,AdminController.updateDistributor);
    
module.exports = router;