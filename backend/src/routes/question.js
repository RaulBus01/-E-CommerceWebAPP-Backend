const { verifyTokenAndUserAuthorization, verifyTokenAndReplyAuthorization, verifyTokenAndAdmin, verifyTokendAndAssociatedDistributor, verifyTokenAndCustomer, verifyTokenAndAuthorization, verifyToken } = require('../middleware/verifyToken');

const router = require('express').Router();
const questionController = require('../controllers/questionController');

//ADD QUESTION
router.post("/addQuestion", verifyTokenAndCustomer, questionController.addQuestion);
//ADD REPLY
router.post("/addReply", verifyTokenAndReplyAuthorization, questionController.addReply);
//DELETE QUESTION
router.delete("/deleteQuestion", verifyTokenAndAdmin, questionController.deleteQuestion);
//DELETE REPLY
router.delete("/deleteReply", verifyTokenAndAdmin, questionController.deleteReply);
//GET ALL QUESTIONS BY PRODUCT ID
router.get("/findQuestion/:productId", questionController.getQuestionByProduct);
//GET ALL QUESTIONS BY USER ID
router.get("/findUserQuestion/:userId", verifyToken, questionController.getQuestionByUser);
//GET ALL QUESTION BY DISTRIBUTOR ID
//router.get("/findDistributorQuestion/:distributorId",verifyTokendAndAssociatedDistributor,questionController.getQuestionByDistributor);

module.exports = router;