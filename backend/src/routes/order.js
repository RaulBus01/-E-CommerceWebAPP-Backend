const { verifyToken,verifyTokenAndDeleteOrderAuthorization, verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyTokenAndDistributor } = require('../middleware/verifyToken');
const orderController = require('../controllers/orderController');
const router = require('express').Router();

//CREATE ORDER(USER)
router.post("/createOrder", verifyToken, orderController.createOrder);
//DELETE ORDER(USER, DISTRIBUTOR)
router.delete("/deleteOrder/:id", verifyTokenAndDeleteOrderAuthorization, orderController.cancelOrder);
//GET ORDER BY ID(USER)
router.get("/order/:id", verifyToken, orderController.getOrder);
//GET ALL ORDERS(ADMIN)
router.get("/findAllOrders", verifyTokenAndAdmin, orderController.getAllOrders);
//GET ORDERS BY USER(USER)
router.get("/yourOrders/:id", verifyTokenAndAuthorization, orderController.getOrdersByUser);
//EDIT ORDER(DISTRIBUTOR)
router.patch("/editOrder/:id", verifyTokenAndDistributor, orderController.editOrder);

module.exports = router;