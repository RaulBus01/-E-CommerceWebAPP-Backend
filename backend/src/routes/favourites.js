const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require('../middleware/verifyToken');
const router = require('express').Router();
const favouritesController = require('../controllers/favouritesController');

//CREATE
router.post("/add", verifyToken, favouritesController.createFavourites);

//UPDATE
router.patch("/edit/:id", verifyTokenAndAuthorization, favouritesController.updateFavourites);

//DELETE PRODUCT FROM FAVOURITES
router.delete("/deleteProduct/:userId/:productId", verifyTokenAndAuthorization, favouritesController.deleteProductFromFavourites);

//DELETE FAVOURITES LIST
router.delete("/delete/:userId", verifyTokenAndAuthorization, favouritesController.deleteFavourites);

//GET FAVOURITES BY USER ID
router.get("/find/:userId", verifyTokenAndAuthorization, favouritesController.getFavourites);

//GET ALL FAVOURITES
router.get("/findAll", verifyTokenAndAdmin, favouritesController.getAllFavourites);

module.exports = router;
