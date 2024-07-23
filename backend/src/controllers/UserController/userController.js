const User = require("../../models/User");
const CryptoJS = require("crypto-js");


exports.updateUser =async (req,res)=>
    {
        if(req.body.hasOwnProperty('email'))
            {
                res.status(400).json("You can't update email address");
                return;
            }
                
        if(req.body.password && req.body.confirm_password)
        {
            if(req.body.password !== req.body.confirm_password)
            {
                res.status(400).json("Passwords don't match");
                return;
            }
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString();
            req.body.confirm_password_password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString();
        }
        else
        {
            if (req.body.password || req.body.confirm_password)
            {
                res.status(400).json("You have to enter both password and confirm password");
                return;
            }
           
        }
       
        try{
            
            
            const user = await User.findById(req.body.id);
           
            if(!user){
                res.status(404).json("User not found");
                return;
            }

            const updatedUser = await User.findOneAndUpdate(
                {_id: req.body.id}, 
                {$set: req.body}, 
                {new: true});
            

            
            const {password, confirm_password, ...others} = updatedUser._doc;

            res.status(200).json(others);
        }catch(err){
            res.status(500).json(err);
        }
}
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.body.id);

        res.status(200).json("User has been deleted");
    }
    catch (err) {
        res.status(500).json(err);
    }
}
exports.getUser = async (req, res) => {
    try {

        const user = await User.findById(req.body.id);
        if(!user){
            res.status(404).json("User not found");
            return;
        }

        const { password, confirm_password, ...others } = user._doc;

        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
}


