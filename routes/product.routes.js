const express = require('express');
const ProductController = require('../controllers/product.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const request_param = multer();
const cloudinary = require('cloudinary');

cloudinary.v2.config({
    "cloud_name": 'dslcqudfq',
    "api_key": '865887567124381',
    "api_secret": 'aW3AA2C1pCIAhY1B1xGut7XBMFo',
});

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
router.get('/product/delete/:id', Authentication.AuthenticateAdmin, ProductController.productDelete);
router.post('/product/add', uploadFile.any(), Authentication.AuthenticateAdmin, ProductController.productAdd);
router.post('/product/list', request_param.any(), Authentication.AuthenticateAdmin, ProductController.productList);
router.post('/product/update/:id', uploadFile.any(), Authentication.AuthenticateAdmin, ProductController.productUpdate);
router.post('/product/change-status/:id', uploadFile.any(), Authentication.AuthenticateAdmin, ProductController.changeStatus);
router.post('/all-products', request_param.any(), ProductController.products);
router.post('/admin/product/rejected/list', request_param.any(), Authentication.AuthenticateAdmin, ProductController.rejectedProductList);
router.post('/admin/product/unapproved/list', request_param.any(), Authentication.AuthenticateAdmin, ProductController.unapprovedProductList);
router.post('/admin/product/approved/list', request_param.any(), Authentication.AuthenticateAdmin, ProductController.approvedProductList);
router.post('/category-wise/product/list', request_param.any(), ProductController.categoryWiseProducts);
router.post('/products/bulk/update', request_param.any(), ProductController.productsBulkUpdate);

module.exports = router;