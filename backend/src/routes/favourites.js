const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require('../middleware/verifyToken');
const router = require('express').Router();
const favouritesController = require('../controllers/favouritesController');

//CREATE
router.post("/add/:id", verifyTokenAndAuthorization, favouritesController.createFavourites);

//ADD
router.put("/edit/:id", verifyTokenAndAuthorization, favouritesController.addFavourites);

//DELETE PRODUCT FROM FAVOURITES
router.delete("/deleteProduct/:id/:productId", verifyTokenAndAuthorization, favouritesController.deleteProductFromFavourites);

//DELETE FAVOURITES LIST
router.delete("/delete/:id", verifyTokenAndAuthorization, favouritesController.deleteAllFavourites);

//GET FAVOURITES BY USER ID
router.get("/find/:id", verifyTokenAndAuthorization, favouritesController.getFavourites);

//GET ALL FAVOURITES
router.get("/findAll", verifyTokenAndAdmin, favouritesController.getAllFavourites);

module.exports = router;
