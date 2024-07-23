const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");

const userController = require("../controllers/UserController/userController");

const router = require("express").Router();
//UPDATE
router.put("/edit",verifyTokenAndAuthorization,userController.updateUser);
//DELETE
router.delete("/delete",verifyTokenAndAuthorization, userController.deleteUser);
//GET USER
router.get("/find",verifyTokenAndAuthorization,userController.getUser);


module.exports = router;