const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");
const User = require("../models/User");
const UserVerificationToken = require("../models/UserVerificationToken");
const userController = require("../controllers/UserController/userController");

const router = require("express").Router();
//UPDATE
router.put("/edit",verifyTokenAndAuthorization,userController.updateUser);
//DELETE
router.delete("/delete",verifyTokenAndAuthorization, userController.deleteUser);
//GET USER
router.get("/find",verifyTokenAndAuthorization,userController.getUser);

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