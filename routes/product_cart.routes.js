const express = require('express');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const productCartController = require('../controllers/product_cart.controller');
const request_param = multer();

router.post('/user/product/cart/add', request_param.any(), Authentication.Authenticate, productCartController.addToCart);
router.get('/user/product/cart', Authentication.Authenticate, productCartController.userProductCart);

module.exports = router;