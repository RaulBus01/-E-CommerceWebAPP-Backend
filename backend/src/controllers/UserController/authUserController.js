
const User = require('../../models/User');
const Cart = require('../../models/Cart');
const Favourites = require('../../models/Favourites');
const CryptoJS = require('crypto-js');
const UserVerificationToken = require('../../models/UserVerificationToken');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { verifyEmail } = require('../emailController');

exports.registerUser = async (req, res) => {
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
        if(!user){
            res.status(400).json("User not saved");
            return;
        }
        
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SECRET, {expiresIn: "3d"});

        const {password, confirm_password, ...others} = user._doc;
        const newCart = new Cart({ userId: user._id, products: [] });
        const savedCart = await newCart.save();
        if(!savedCart){
            res.status(400).json("Cart not saved");
            return;
        }
        const newFavourites = new Favourites({ products: [], userId: user._id });
        const savedFavourites = await newFavourites.save();
        if(!savedFavourites){
            res.status(400).json("Favourites not saved");
            return;
        }

      
        const verificationToken = new UserVerificationToken({
            userId: user._id,
            token: crypto.randomBytes(16).toString('hex')
        });
        const savedVerificationToken = await verificationToken.save();
        
        
        const link = `http://localhost:3001/api/users/confirmAccount/${savedVerificationToken.token}`;
        try{
         
            await verifyEmail(user.email, link);
            
            res.status(200).send({
                message: 'Verification email sent. Please check your email',
                user: others,
                accessToken: accessToken,

            });
            }
        catch(err){
            res.status(500).json(err);
        }

        
        
    } catch (err) {
        res.status(500).json(err);
    }
}
exports.loginUser =  async (req, res) => {
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
