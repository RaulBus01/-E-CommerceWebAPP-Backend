const { verifyTokenAndAuthorization, verifyTokenAndAdmin,verifyToken } = require("../middleware/verifyToken");
const User = require("../models/User");
const UserVerificationToken = require("../models/UserVerificationToken");
const userController = require("../controllers/UserController/userController");
const Customer = require("../models/Customer");

const router = require("express").Router();
//UPDATE USER
router.put("/edit",verifyToken,userController.updateUser);
//UPDATE ADMIN
router.put("/editByAdmin",verifyTokenAndAdmin,userController.updateUser);
//DELETE
router.delete("/delete",verifyTokenAndAdmin, userController.deleteUser);
//GET USER
router.get("/find/:id",verifyToken,userController.getUser);
//GET ALL USERS
router.get("/all",verifyTokenAndAdmin,userController.getAllUsers);

//ACTIVATE ACCOUNT
router.get("/confirmAccount/:token", async (req, res)=>
{
    try{
        const token = await UserVerificationToken.findOne({
            token: req.params.token,
        });
        const user = await User.findById(token.userId);
        if (!user) {
            return res.status(404).send("User not found.");
        }
        if (user.role === 'customer') {
            const customer = await Customer.findById(user._id);
            if (!customer) {
              return res.status(404).send("Customer not found.");
            }
      
            customer.isVerified = true;
            await customer.save();
          }
        await UserVerificationToken.findByIdAndRemove(token._id);
        res.status(200).send("email is verified!");
    }catch(error){
        res.status(500).json(error);
    }
})

module.exports = router;