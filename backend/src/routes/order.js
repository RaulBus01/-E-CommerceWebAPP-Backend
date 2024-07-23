const { verifyToken,verifyTokenAndCancelOrderAuthorization, verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyTokenAndDistributor, verifyTokenAndEditOrderStatusAuthorization } = require('../middleware/verifyToken');
const orderController = require('../controllers/orderController');
const router = require('express').Router();

//CREATE ORDER(USER)
router.post("/createOrder", verifyToken, orderController.createOrder);
//CANCEL ORDER(USER, DISTRIBUTOR)
router.patch("/cancelOrder/:orderId", verifyTokenAndCancelOrderAuthorization, orderController.cancelOrder);
//GET ORDER BY ID(USER)
router.get("/order/:id", verifyToken, orderController.getOrder);
//GET ALL ORDERS(ADMIN)
router.get("/findAllOrders", verifyTokenAndAdmin, orderController.getAllOrders);
//GET ORDERS BY USER(USER)
router.get("/yourOrders", verifyTokenAndAuthorization, orderController.getOrdersByUser);
//EDIT ORDER(DISTRIBUTOR)
router.patch("/editOrderStatus/:orderId", verifyTokenAndEditOrderStatusAuthorization, orderController.editOrderStatus);

module.exports = router;