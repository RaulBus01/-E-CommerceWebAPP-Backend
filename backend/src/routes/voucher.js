const router = require('express').Router();
const voucherController = require('../controllers/voucherController');
const { verifyTokenAndAdmin } = require('../middleware/verifyToken');

router.post("/add", voucherController.createVoucher);
router.put("/edit", voucherController.updateVoucher);
router.get("/find/:email",verifyTokenAndAdmin, voucherController.getVoucher);
router.get("/findAll",verifyTokenAndAdmin, voucherController.getAllVouchers);

module.exports = router;