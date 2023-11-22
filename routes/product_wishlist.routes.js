const express = require('express');
const productWishlistController = require('../controllers/product_wishlist.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.get('/user/product/wishlist', Authentication.Authenticate, productWishlistController.userProductWishlist);
router.post('/user/product/wishlist/add', request_param.any(), Authentication.Authenticate, productWishlistController.addToWishlist);

module.exports = router;