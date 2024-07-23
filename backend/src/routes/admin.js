const {verifyTokenAndAdmin } = require("../middleware/verifyToken");
const verifyId = require("../middleware/verifyId");

const router = require("express").Router();
const AdminController = require("../controllers/AdminController/adminController");
//UPDATE USER
router.put("/edit",verifyId,verifyTokenAndAdmin,AdminController.updateUser);
//DELETE USER
router.delete("/delete",verifyId,verifyTokenAndAdmin, AdminController.deleteUser);
//GET USER
router.get("/findUser",verifyId,verifyTokenAndAdmin,AdminController.getUser);

//GET ALL USERS
router.get("/findAllUsers",verifyTokenAndAdmin,AdminController.getAllUsers);

//GET DISTRIBUTOR
router.get("/findDistributor",verifyId,verifyTokenAndAdmin,AdminController.getDistributor);
//GET ALL DISTRIBUTORS
router.get("/findAllDistributors",verifyTokenAndAdmin,AdminController.getAllDistributors);
//DELETE DISTRIBUTOR
router.delete("/deleteDistributor",verifyId,verifyTokenAndAdmin,AdminController.deleteDistributor);
//UPDATE DISTRIBUTOR
router.patch("/editDistributor",verifyId,verifyTokenAndAdmin,AdminController.updateDistributor);
    
module.exports = router;