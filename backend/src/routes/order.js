const { verifyToken,verifyTokenAndCustomer,verifyTokenAndCancelOrderAuthorization, verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyTokenAndEditOrderStatusAuthorization, verifyTokendAndAssociatedDistributor, verifyOrderOwnership } = require('../middleware/verifyToken');
const orderController = require('../controllers/orderController');
const verifyId = require('../middleware/verifyId');
const router = require('express').Router();

//CREATE ORDER(USER)
router.post("/createOrder",verifyTokenAndCustomer, verifyTokenAndAuthorization, orderController.createOrder);
//CANCEL ORDER
router.put("/cancelOrder/:id",verifyId, verifyTokenAndCancelOrderAuthorization, orderController.cancelOrder);


//GET ORDER BY ID(USER)
router.get("/order/:id",verifyId, verifyTokenAndAuthorization, orderController.getOrder);
//GET ALL ORDERS(ADMIN)
router.get("/findAllOrders", verifyTokenAndAdmin, orderController.getAllOrders);
//GET ORDERS BY USER(USER)
// router.get("/yourOrders/:id", verifyTokenAndAuthorization, orderController.getOrdersByUser);
//GET ORDERS BY DISTRIBUTOR(DISTRIBUTOR)
// router.get("/distributorOrders/:id", verifyId,verifyTokendAndAssociatedDistributor, orderController.getOrdersByDistributor);
//EDIT ORDER(DISTRIBUTOR)
// router.put("/editOrderStatus/:id", verifyId,verifyTokenAndEditOrderStatusAuthorization, orderController.editOrderStatus);

module.exports = router;