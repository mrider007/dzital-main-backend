const express = require('express');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const productCartController = require('../controllers/product_cart.controller');
const request_param = multer();

router.get('/user/product/cart', Authentication.Authenticate, productCartController.userProductCart);
router.post('/user/product/cart/add', request_param.any(), Authentication.Authenticate, productCartController.addToCart);
router.post('/user/product/cart/remove', Authentication.Authenticate, productCartController.removeProductCart);

module.exports = router;