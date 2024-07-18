const router = require('express').Router();
const User = require('../../../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');


//Register User

router.post('/register', async (req, res) => {
    const newUser = new User({
        first_name: req.body.first_name,
        last_name : req.body.last_name,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
        confirm_password: CryptoJS.AES.encrypt(req.body.confirm_password, process.env.PASS_SECRET).toString(),
    });
    try {
        if(req.body.password !== req.body.confirm_password){
            res.status(400).json("Passwords do not match");
            return;
        }
        if(req.body.password.length < 6){
            res.status(400).json("Password must be at least 6 characters long");
            return;
        }
        
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});


//Login User
router.post('/login', async (req, res) => {
    const email = req.body.email;
    const input_password = req.body.password;
    try {
        const user = await User.findOne({
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
);

module.exports = router;