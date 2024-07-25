const { verifyTokenAndUserAuthorization, verifyTokenAndReplyAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken');
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




module.exports = router;