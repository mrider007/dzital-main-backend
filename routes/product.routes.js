const express = require('express');
const ProductController = require('../controllers/product.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const request_param = multer();

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (!fs.existsSync('./uploads/product')) {
            fs.mkdirSync('./uploads/product');
        }
        callback(null, './uploads/product');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '_' + file.originalname.replace(/\s/g, '_'));
    }
});

const uploadFile = multer({ storage: Storage });

router.get('/product/details/:id', Authentication.AuthenticateAdmin, ProductController.productDetails);
router.post('/product/add', uploadFile.any(), Authentication.AuthenticateAdmin, ProductController.productAdd);
router.post('/product/list', request_param.any(), Authentication.AuthenticateAdmin, ProductController.productList);
router.post('/product/update/:id', uploadFile.any(), Authentication.AuthenticateAdmin, ProductController.productUpdate);

module.exports = router;