const Distributor = require("../../models/Distributor");
const CryptoJS = require("crypto-js");


exports.updateDistributor =async (req,res)=>
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
        const distributor = await Distributor.findById(req.body.id);
        
        if(!distributor){
            res.status(404).json("Distributor not found");
            return;
        }

        const updatedDistributor = await Distributor.findOneAndUpdate(
            {_id: req.body.id}, 
            {$set: req.body}, 
            {new: true});
        const {password, confirm_password, ...others} = updatedDistributor._doc;

        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
}

exports.getDistributor = async (req, res) => {
    try {

        const distributor = await Distributor.findById(req.params.id);
        if(!distributor){
            res.status(404).json("Distributor not found");
            return;
        }
        const { password, confirm_password, ...others } = distributor._doc;

        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
}