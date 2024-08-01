const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middleware/verifyToken");
const User = require("../models/User");
const UserVerificationToken = require("../models/UserVerificationToken");
const userController = require("../controllers/UserController/userController");

const router = require("express").Router();
//UPDATE USER
router.put("/edit",verifyTokenAndAuthorization,userController.updateUser);
//UPDATE ADMIN
router.put("/editByAdmin",verifyTokenAndAdmin,userController.updateUser);
//DELETE
router.delete("/delete",verifyTokenAndAdmin, userController.deleteUser);
//GET USER
router.get("/find/:id",verifyTokenAndAuthorization,userController.getUser);
//GET ALL USERS
router.get("/all",verifyTokenAndAdmin,userController.getAllUsers);

//ACTIVATE ACCOUNT
router.get("/confirmAccount/:token", async (req, res)=>
{
    try{
        const token = await UserVerificationToken.findOne({
            token: req.params.token,
        });
        await User.updateOne({_id: token.userId},{$set: {isVerified: true}});
        await UserVerificationToken.findByIdAndRemove(token._id);
        res.status(200).send("email is verified!");
    }catch(error){
        res.status(500).json(error);
    }
})

module.exports = router;