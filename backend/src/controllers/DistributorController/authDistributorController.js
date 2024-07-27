const Distributor = require('../../models/Distributor');
const CryptoJS = require('crypto-js');

const jwt = require('jsonwebtoken');

exports.registerDistributor = async (req, res) => {
    const newDistributor = new Distributor({
        name: req.body.name,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
        confirm_password: CryptoJS.AES.encrypt(req.body.confirm_password, process.env.PASS_SECRET).toString(),
        phoneNumber: req.body.phoneNumber,
        address: {
            country: req.body.address.country,
            county: req.body.address.county,
            city: req.body.address.city,
            street: req.body.address.street,
            number: req.body.address.number,
            zip: req.body.address.zip,
        },
        CUI: req.body.CUI,
    });
    try {
        
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
        const savedDistributor = await newDistributor.save();
        if(!savedDistributor){
            res.status(400).json("Distributor not saved");
            return;
        }
        const accessToken = jwt.sign({
            id: newDistributor._id,
            isAdmin: newDistributor.isAdmin,
        }, process.env.JWT_SECRET, {expiresIn: "3d"});
        const {password, confirm_password, ...others} = savedDistributor._doc;
        res.status(200).json({
            user: others,
            accessToken: accessToken,
        });

    } catch (err) {
        res.status(500).json(err);
    }
}
exports.loginDistributor = async (req, res) => {
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


            res.status(200).json({
                user: others,
                accessToken: accessToken,

            });
           
        } else {
            res.status(401).json("Wrong password");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}   