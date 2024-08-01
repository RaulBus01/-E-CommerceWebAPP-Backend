
const User = require('../../models/User');
const Cart = require('../../models/Cart');
const Distributor = require('../../models/Distributor');
const Customer = require('../../models/Customer');
const Favourites = require('../../models/Favourites');
const CryptoJS = require('crypto-js');
const UserVerificationToken = require('../../models/UserVerificationToken');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { verifyEmail } = require('../emailController');

exports.registerUser = async (req, res) => {
    try {
        
        if(req.body.password !== req.body.confirm_password){
            return res.status(400).json("Passwords do not match");
           
        }
        if(req.body.password.length < 6){
            return res.status(400).json("Password must be at least 6 characters long");
        
        }
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
            role: req.body.role,
        });
       
        if(req.body.role === 'distributor'){
            
            const newDistributor = new Distributor({
                _id: newUser._id,
                address: req.body.address,
                CUI: req.body.CUI,
            });
           
            const savedDistributor = await newDistributor.save();
            if(!savedDistributor){
                return res.status(400).json("Distributor not saved");
            
            }

            newUser.distributorInfo = savedDistributor._id;
        }
        if(req.body.role === 'customer'){
        
            const newCustomer = new Customer( {_id: newUser._id} );    
            console.log(newCustomer);
            const savedCustomer = await newCustomer.save();
            if(!savedCustomer){
                return res.status(400).json("Customer not saved");
                
            }

            newUser.customerInfo = savedCustomer._id;
        }
        

        const user = await newUser.save();
        if(!user){
            return res.status(400).json("User not saved");  
        }

        
       
        const accessToken = jwt.sign({
            id: user._id,
            role: user.role,
            email: user.email,
            name: user.name,
           
        }, process.env.JWT_SECRET, {expiresIn: "3d"});

    
        if(user.role === 'customer')
        {
            const newCart = new Cart({ products: [], userId: user._id });
            const savedCart = await newCart.save();
            if(!savedCart){
                return res.status(400).json("Cart not saved");
                
            }
            const newFavourites = new Favourites({ products: [], userId: user._id });
            const savedFavourites = await newFavourites.save();
            if(!savedFavourites){
                res.status(400).json("Favourites not saved");
                return;
            }
        }

      
        const verificationToken = new UserVerificationToken({
            userId: user._id,
            token: crypto.randomBytes(16).toString('hex')
        });
        const savedVerificationToken = await verificationToken.save();
        
        
        const link = `http://localhost:3001/api/users/confirmAccount/${savedVerificationToken.token}`;
        const {password, ...others} = user._doc;
        if(user.role ==='customer')
        {
            await verifyEmail(user.email, link);
        
           
                
            res.status(200).send({
                message: 'Verification email sent. Please check your email',
                user: others,
                accessToken: accessToken,

            });
        }
        if(user.role === 'distributor'){
            res.status(200).send({
                message: 'Distributor account created',
                user: others,
                accessToken: accessToken,

            });
        }
        
        

        
        
    } catch (err) {
        res.status(500).json(err);
    }
}
exports.loginUser =  async (req, res) => {

    try {
        const user = await User.findOne({
            email: req.body.email,
        });
        if(!user){
            res.status(404).json("Wrong email");
            return;
        }
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET).toString(CryptoJS.enc.Utf8);
        const password = hashedPassword.toString(CryptoJS.enc.Utf8);
        if(password === req.body.password){
            const{password, ...others} = user._doc;
            const accessToken = jwt.sign(
                { 
                    id: user._id,
                    role: user.role,
                    email: user.email,
                    name: user.name,
                  
                },
                process.env.JWT_SECRET,
                { expiresIn: "3d" }
            );

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
