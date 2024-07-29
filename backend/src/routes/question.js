const { verifyTokenAndUserAuthorization, verifyTokenAndReplyAuthorization, verifyTokenAndAdmin, verifyTokendAndAssociatedDistributor } = require('../middleware/verifyToken');
const verifyId = require('../middleware/verifyId');
const router = require('express').Router();
const questionController = require('../controllers/questionController');

//ADD QUESTION
router.post("/addQuestion", verifyTokenAndUserAuthorization, questionController.addQuestion);
//ADD REPLY
router.post("/addReply",verifyId,verifyTokenAndReplyAuthorization, questionController.addReply);
//DELETE QUESTION
router.delete("/deleteQuestion",verifyId,verifyTokenAndAdmin, questionController.deleteQuestion);
//DELETE REPLY
router.delete("/deleteReply",verifyId,verifyTokenAndAdmin, questionController.deleteReply);
//GET ALL QUESTIONS BY PRODUCT ID
router.get("/findQuestion/:productId",questionController.getQuestion);
//GET ALL QUESTIONS BY USER ID
router.get("/findUserQuestion/:userId",verifyTokenAndUserAuthorization,questionController.getQuestionByUser);
//GET ALL QUESTION BY DISTRIBUTOR ID
router.get("/findDistributorQuestion/:distributorId",verifyTokendAndAssociatedDistributor,questionController.getQuestionByDistributor);





module.exports = router;