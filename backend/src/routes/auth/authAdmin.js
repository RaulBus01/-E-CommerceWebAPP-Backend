const router = require('express').Router();
const authAdminController = require('../../controllers/AdminController/authAdminController');


//Register Admin

router.post('/register', authAdminController.registerAdmin);

//Login Admin
router.post('/login', authAdminController.loginAdmin);

module.exports = router;