const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require('../middleware/verifyToken');
const router = require('express').Router();
const favouritesController = require('../controllers/favouritesController');

//CREATE
router.post("/add", verifyTokenAndAuthorization, favouritesController.createFavourites);

//ADD
router.put("/edit", verifyTokenAndAuthorization, favouritesController.addFavourites);

//DELETE PRODUCT FROM FAVOURITES
router.delete("/deleteProduct", verifyTokenAndAuthorization, favouritesController.deleteProductFromFavourites);

//DELETE FAVOURITES LIST
router.delete("/deleteAll", verifyTokenAndAuthorization, favouritesController.deleteAllFavourites);

//GET FAVOURITES BY USER ID
router.get("/find/:id", verifyTokenAndAuthorization, favouritesController.getFavourites);

//GET ALL FAVOURITES
router.get("/findAll", verifyTokenAndAdmin, favouritesController.getAllFavourites);

module.exports = router;
