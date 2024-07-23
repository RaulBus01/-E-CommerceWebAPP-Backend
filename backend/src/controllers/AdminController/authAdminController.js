const Admin = require('../../models/Admin');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

exports.registerAdmin = async (req, res) => {
    const newAdmin = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),


    });
    try {
        const checkAdmin = await Admin.findOne({email: req.body.email,});
        if (checkAdmin) {
            res.status(404).json("Admin already exists");
            return;
        }
        if(req.body.password.length < 6){
            res.status(400).json("Password must be at least 6 characters long");
            return;
        }
        
        const user = await newAdmin.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}
exports.loginAdmin =  async (req, res) => {
    const email = req.body.email;
    const input_password = req.body.password;
    try {
        
        const user = await Admin.findOne({
            email: email,
        });
        if(!user){
            res.status(404).json("Wrong email");
            return;
        }
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET).toString(CryptoJS.enc.Utf8);
        const password = hashedPassword.toString(CryptoJS.enc.Utf8);
        if(password === input_password){
            const{password,confirm_password, ...others} = user._doc;
            const accessToken = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin,
            }, process.env.JWT_SECRET, {expiresIn: "3d"});


            res.status(200).json({...others, accessToken});
           
        } else {
            res.status(401).json("Wrong password");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}   

