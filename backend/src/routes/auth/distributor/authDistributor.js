const router = require('express').Router();
const Distributor = require('../../../models/Distributor');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');


//Register Distributor

router.post('/register', async (req, res) => {
    const newDistributor = new Distributor({
        name: req.body.name,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        CUI: req.body.CUI,
    });
    try {
        const checkDistributor = await Distributor.findOne({email: req.body.email,});
        if (checkDistributor) {
            res.status(404).json("Distributor already exists");
            return;
        }
        if(req.body.password.length < 6){
            res.status(400).json("Password must be at least 6 characters long");
            return;
        }
        if(req.body.phoneNumber.length != 10){
            
            res.status(400).json("Phone number must be 10 characters long");
            return;
        }
        if(!req.body.address)
        {
            res.status(400).json("Address is required");
            return;
        }
        if(req.body.CUI.length != 6){
            res.status(400).json("CUI must be at 6 characters long");
            return;
        }
        
       
        
        const user = await newDistributor.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});


//Login Distributor
router.post('/login', async (req, res) => {
    const email = req.body.email;
    const input_password = req.body.password;
    try {
        const user = await Distributor.findOne({
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
                isDistributor: user.isDistributor,
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