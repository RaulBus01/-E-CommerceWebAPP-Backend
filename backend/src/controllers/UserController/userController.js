const User = require("../../models/User");
const CryptoJS = require("crypto-js");
const Distributor = require("../../models/Distributor");
const Customer = require("../../models/Customer");


exports.updateUser = async (req, res) => {
    const { id, password, confirm_password,...updateFields } = req.body;

    
  

   
    if (password || confirm_password) {
        if (!password || !confirm_password) {
            return res.status(400).json("You have to enter both password and confirm password");
        }
        if (password !== confirm_password) {
            return res.status(400).json("Passwords don't match");
        }

        updateFields.password = CryptoJS.AES.encrypt(password, process.env.PASS_SECRET).toString();
    }

    try {
        
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json("User not found");
        }

        if(req.user.role === 'distributor')
        {
            const distributor = await Distributor.findById(user._id);
            if(!distributor){
                return res.status(404).json("Distributor not found");
            }
            if(updateFields.hasOwnProperty('isAuthorized'))
            {
                return res.status(400).json("You can't change the authorization status");
            }

            await Distributor.findByIdAndUpdate(
                distributor._id,
                { $set: updateFields },
                { new: true }
            );

        }
        if(req.user.role === 'customer')
        {
            const customer = await Customer.findById(user._id);
            if(!customer){
                return res.status(404).json("Customer not found");
            }
            if(!customer.hasOwnProperty('address') && updateFields.address){
               customer.address = {};
            }
            if(!customer.hasOwnProperty('payment') && updateFields.payment){
                customer.payment = {};
            }
            if (updateFields.hasOwnProperty('isVerified') )
            {
                return res.status(400).json("You can't change the verification status");
            }
       
            await Customer.findByIdAndUpdate(
                customer._id,
                { $set: updateFields },
                { new: true }   
            );
        }
        if(req.user.role === 'admin')
        {
            if(user.role === 'distributor')
            {
                const distributor = await Distributor.findById(user._id);
                if(!distributor){
                    return res.status(404).json("Distributor not found");
                }
            
                await Distributor.findByIdAndUpdate(
                    distributor._id,
                    { $set: updateFields },
                    { new: true }
                );
    
            }
            if (user.role ==='customer')
            {
                const customer = await Customer.findById(user._id);
                if(!customer){
                    return res.status(404).json("Customer not found");
                }
                await Customer.findByIdAndUpdate(
                    customer._id,
                    { $set: updateFields },
                    { new: true }
                );

            }
        }
       

        if(!user.phoneNumber && updateFields.phoneNumber){
            user.phoneNumber ={};
        }
        const updatedUser = await User.findByIdAndUpdate(
            id, 
            { $set: updateFields }, 
            { new: true }
        );

        const { password, ...others } = updatedUser._doc;

        res.status(200).json(others);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err });
    }
};

exports.deleteUser = async (req, res) => {
    try {

        const user = await User.findById(req.body.id);
        if (!user) {
            return res.status(404).json("User not found");
        }
        if(user.role === 'distributor')
        {
            const distributor = await Distributor.findById(user._id);
            if(!distributor){
                return res.status(404).json("Distributor not found");
            }
            await Distributor.findByIdAndDelete(distributor._id);
        }
        if(user.role === 'customer')
        {
            const customer = await Customer.findById(user._id);
            if(!customer){
                return res.status(404).json("Customer not found");
            }
            await Customer.findByIdAndDelete(customer._id);
        }
        await User.findByIdAndDelete(user._id);


      
        res.status(200).json("User has been deleted");
    }
    catch (err) {
        res.status(500).json(err);
    }
}
exports.getUser = async (req, res) => {
    try {
   
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json("User not found");
        
        }
        if(user.role === 'distributor')
        {
            const userData = await User.findById(user._id).populate('distributorInfo');
            const { password, ...others } = userData._doc;
            return res.status(200).json(others);
        }
        if(user.role === 'customer')
        {
            const userData = await User.findById(user._id).populate('customerInfo');
            const { password, ...others } = userData._doc;
            return res.status(200).json(others);
        }



        
    } catch (err) {
        res.status(500).json(err);
    }
}
exports.getAllUsers = async (req, res) => {
    try{
        const users = await User.find();
        if(!users){
            return res.status(404).json("No users found");
        }
        const nonAdminUsers = users.filter(user => user.role !== 'admin');

        const infoUser = await Promise.all(nonAdminUsers.map(async (user) => {
            if(user.role === 'admin')
            {
                return;
            }
            if (user.role === 'distributor') {
                const userData = await User.findById(user._id).populate('distributorInfo');
                const { password, ...others } = userData._doc;
                return others;
            }
            if (user.role === 'customer') {
                const userData = await User.findById(user._id).populate('customerInfo');
                const { password, ...others } = userData._doc;
                return others;
            }
           
        }));

        
        return res.status(200).json(infoUser);
    }
    catch(err){
        return res.status(500).json(err);
    }
}



