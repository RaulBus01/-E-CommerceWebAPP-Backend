const { verifyToken,verifyTokenAndCancelOrderAuthorization, verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyTokenAndEditOrderStatusAuthorization, verifyTokendAndAssociatedDistributor } = require('../middleware/verifyToken');
const orderController = require('../controllers/orderController');
const verifyId = require('../middleware/verifyId');
const router = require('express').Router();

//CREATE ORDER(USER)
router.post("/createOrder", verifyToken, orderController.createOrder);
//CANCEL ORDER(USER, DISTRIBUTOR)
router.patch("/cancelOrder/:id",verifyId, verifyTokenAndCancelOrderAuthorization, orderController.cancelOrder);
//GET ORDER BY ID(USER)
router.get("/order/:id",verifyId,verifyToken, orderController.getOrder);
//GET ALL ORDERS(ADMIN)
router.get("/findAllOrders", verifyTokenAndAdmin, orderController.getAllOrders);
//GET ORDERS BY USER(USER)
router.get("/yourOrders/:id", verifyTokenAndAuthorization, orderController.getOrdersByUser);
//GET ORDERS BY DISTRIBUTOR(DISTRIBUTOR)
router.get("/distributorOrders/:id", verifyId,verifyTokendAndAssociatedDistributor, orderController.getOrdersByDistributor);
//EDIT ORDER(DISTRIBUTOR)
router.patch("/editOrderStatus/:id", verifyId,verifyTokenAndEditOrderStatusAuthorization, orderController.editOrderStatus);

module.exports = router;