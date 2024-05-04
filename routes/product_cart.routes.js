const express = require('express');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const productCartController = require('../controllers/product_cart.controller');
const request_param = multer();

router.get('/user/product/cart', Authentication.Authenticate, productCartController.userProductCart);
router.get('/cart/product/details/:id', Authentication.Authenticate, productCartController.productCartDetails);
router.post('/user/product/cart/add', request_param.any(), Authentication.Authenticate, productCartController.addToCart);
router.post('/user/product/cart/remove', Authentication.Authenticate, productCartController.removeProductCart);
router.post('/user/product/cart/quantity', Authentication.Authenticate, productCartController.updateQuantity);
router.post('/user/product/cart/clear', Authentication.Authenticate, productCartController.clearCart);

module.exports = router;