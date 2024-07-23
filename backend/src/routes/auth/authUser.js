const router = require('express').Router();
const authUserController = require('../../controllers/UserController/authUserController');


//Register User

router.post('/register',authUserController.registerUser);


//Login User
router.post('/login', authUserController.loginUser);

module.exports = router;