const router = require("express").Router();
const reviewController = require('../controllers/reviewController');
const verifyId = require('../middleware/verifyId');
const { verifyTokenAndAdmin, verifyTokenAndUserAuthorization } = require("../middleware/verifyToken");

//ADD REVIEW
router.post("/addReview", verifyId, verifyTokenAndUserAuthorization, reviewController.addReviewToProduct);
//GET REVIEWS BY PRODUCT
router.get("/getReviewsForProduct", verifyId, reviewController.getReviewsByProduct);
//GET REVIEWS BY USER
router.get("/getReviewsByUser", verifyId, verifyTokenAndUserAuthorization, reviewController.getReviewsByUser);
//DELETE REVIEW
router.delete("/deleteReview", verifyId, verifyTokenAndAdmin, reviewController.deleteReview);

module.exports = router;