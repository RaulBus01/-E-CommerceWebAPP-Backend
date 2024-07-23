const {verifyTokenAndAdmin } = require("../middleware/verifyToken");

const router = require("express").Router();
const AdminController = require("../controllers/AdminController/adminController");
//UPDATE USER
router.put("/edit",verifyTokenAndAdmin,AdminController.updateUser);
//DELETE USER
router.delete("/delete",verifyTokenAndAdmin, AdminController.deleteUser);
//GET USER
router.get("/find",verifyTokenAndAdmin,AdminController.getUser);

//GET ALL USERS
router.get("/findAll",verifyTokenAndAdmin,AdminController.getAllUsers);
    
module.exports = router;