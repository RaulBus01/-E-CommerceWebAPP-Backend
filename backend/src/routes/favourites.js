const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken');
const router = require('express').Router();
const favouritesController = require('../controllers/favouritesController');


//ADD
router.put("/add", verifyTokenAndAuthorization, favouritesController.addFavourites);

//DELETE PRODUCT FROM FAVOURITES
router.delete("/deleteProduct", verifyTokenAndAuthorization, favouritesController.deleteProductFromFavourites);

//DELETE FAVOURITES LIST
router.delete("/deleteAll", verifyTokenAndAuthorization, favouritesController.deleteAllFavourites);

//GET FAVOURITES BY USER ID
router.get("/find/:id", verifyTokenAndAuthorization, favouritesController.getFavourites);

//GET ALL FAVOURITES
router.get("/findAll", verifyTokenAndAdmin, favouritesController.getAllFavourites);

module.exports = router;
