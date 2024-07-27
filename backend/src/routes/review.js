const router = require("express").Router();
const reviewController = require('../controllers/reviewController');
const verifyId = require('../middleware/verifyId');
const { verifyTokenAndAdmin, verifyTokenAndUserAuthorization, verifyTokenAndAuthorization } = require("../middleware/verifyToken");

//ADD REVIEW
router.post("/addReview", verifyId, verifyTokenAndUserAuthorization, reviewController.addReviewToProduct);
//GET REVIEWS BY PRODUCT
router.get("/getReviewsForProduct/:productId", verifyId, reviewController.getReviewsByProduct);
//GET REVIEWS BY USER
router.get("/getReviewsByUser/:id", verifyId, verifyTokenAndAuthorization, reviewController.getReviewsByUser);
//DELETE REVIEW
router.delete("/deleteReview", verifyId, verifyTokenAndAdmin, reviewController.deleteReview);

module.exports = router;