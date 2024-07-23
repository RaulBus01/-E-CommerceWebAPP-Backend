const User = require("../../models/User");
const Distributor = require("../../models/Distributor");

exports.updateUser =async (req,res)=>
    {
          
        if (req.body.hasOwnProperty('password') || req.body.hasOwnProperty('confirm_password') || req.body.hasOwnProperty('email')) 
        {
            res.status(400).json("You can't update password");
            return;
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
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if(!users){
            res.status(404).json("No users found");
            return;
        }
        const infoUser = users.map((user) => {
            const { password, confirm_password, ...others } = user._doc;
            return others;
        });
        

        
        res.status(200).json(infoUser);
    } catch (err) {
        res.status(500).json(err);
    }
}
exports.getDistributor = async (req, res) => {
    try {
        const distributor = await Distributor.findById(req.body.id);
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
exports.getAllDistributors = async (req, res) => {
    try {
        const distributors = await Distributor.find();
        if(!distributors){
            res.status(404).json("No distributors found");
            return;
        }
        const infoDistributor = distributors.map((distributor) => {
            const { password, confirm_password, ...others } = distributor._doc;
            return others;
        });
        

        
        res.status(200).json(infoDistributor);
    } catch (err) {
        res.status(500).json(err);
    }
}
exports.deleteDistributor = async (req, res) => {
    try {
        await Distributor.findByIdAndDelete(req.body.id);
        res.json("Distributor has been deleted");
    }
    catch (err) {
        res.status(500).json(err);
    }
}
exports.updateDistributor = async (req, res) => {
    if(!req.body.isAuthorized){
        res.status(403).json("You are not authorized to edit this field");
        return;
    }
    if(req.body.password || req.body.confirm_password || req.body.email){
        res.status(400).json("You can't update password or email address");
        return;

    }
    if (req.body.isAuthorized !== 'True' && req.body.isAuthorized !== 'False') {
        res.status(400).json("isAuthorized must be a boolean");
        return;
    }

    
    
        
    try{
        
        
        const distributor = await Distributor.findById(req.body.id);
       
        if(!distributor){
            res.status(404).json("User not found");
            return;
        }
        req.body.isAuthorized = req.body.isAuthorized === 'True' ? true : false;
        

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


