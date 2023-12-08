const Product = require('../models/product.model');
const ProductElectronics = require('../models/product_electronics.model');
const Property = require('../models/product_real_estate.model');
const Category = require('../models/service_master.model');
const mongoose = require('mongoose');
const productRepo = require('../repositories/product.repository');
const cloudinary = require('cloudinary');

class productController {
    constructor() { }

    async productAdd(req, res) {
        try {
            if (req.files && req.files.length > 0) {

                var photo, image_1, image_2, image_3;

                for (let i = 0; i < req.files.length; i++) {
                    const element = req.files[i];
                    if (element.fieldname === 'photo') {
                        photo = element.path;
                        const uploadResultLogo = await cloudinary.v2.uploader.upload(photo);
                        req.body.photo = uploadResultLogo.secure_url;
                    }
                    if (element.fieldname === 'image_1') {
                        image_1 = element.path;
                        const uploadResultFaviconLogo = await cloudinary.v2.uploader.upload(image_1);
                        req.body.image_1 = uploadResultFaviconLogo.secure_url;
                    }
                    if (element.fieldname === 'image_2') {
                        image_2 = element.path;
                        const uploadResultFaviconLogo = await cloudinary.v2.uploader.upload(image_2);
                        req.body.image_2 = uploadResultFaviconLogo.secure_url;
                    }
                    if (element.fieldname === 'image_3') {
                        image_3 = element.path;
                        const uploadResultFaviconLogo = await cloudinary.v2.uploader.upload(image_3);
                        req.body.image_3 = uploadResultFaviconLogo.secure_url;
                    }
                }
            }
            req.body.userId = req.user._id;
            let productSave = await Product.create(req.body);
            if (!_.isEmpty(productSave) && productSave._id) {
                req.body.product_id = productSave._id;
                let saveData = await ProductDetails.create(req.body);
                if (!_.isEmpty(saveData) && saveData._id) {
                    res.status(200).send({ status: 200, data: saveData, message: 'Product saved successfully' });
                } else {
                    res.status(400).send({ status: 400, data: {}, message: 'Product could not be added' });
                }
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    /** Admin Product List */
    async productList(req, res) {
        try {
            if (!req.body.page) {
                req.body.page = 1;
            } else {
                req.body.page = parseInt(req.body.page);
            }

            if (!req.body.limit) {
                req.body.limit = 50;
            } else {
                req.body.limit = parseInt(req.body.limit);
            }
            let products = await productRepo.allProducts(req);
            if (!_.isEmpty(products)) {
                res.status(200).send({ status: 200, data: products.docs, total: products.total, limit: products.limit, page: products.page, pages: products.pages, message: 'Products list fetched successfully' });
            } else {
                res.status(400).send({ status: 400, data: [], message: 'No products found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    /** Admin Product Details */
    async productDetails(req, res) {
        try {
            const productInfo = await Product.findOne({ _id: req.params.id });
            if (!_.isEmpty(productInfo) && productInfo._id) {
                let categoryInfo = await Category.findOne({ _id: productInfo.category_id });
                if (categoryInfo.title === 'Real Estate') {
                    let propertyDetails = await Property.findOne({ product_id: productInfo._id });
                    if (!_.isEmpty(propertyDetails) && propertyDetails._id) {
                        res.status(200).send({ status: 200, data: propertyDetails, message: 'Property details has been fetched successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
                    }
                }
                else if (categoryInfo.title === 'Electronics') {
                    let productElectronicsDetails = await ProductElectronics.findOne({ product_id: productInfo._id });
                    if (!_.isEmpty(productElectronicsDetails) && productElectronicsDetails._id) {
                        res.status(200).send({ status: 200, data: productElectronicsDetails, message: 'Product details has been fetched successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
                    }
                }
            } else {
                res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    /** User Product List */
    async products(req, res) {
        try {
            if (!req.body.page) {
                req.body.page = 1;
            } else {
                req.body.page = parseInt(req.body.page);
            }

            if (!req.body.limit) {
                req.body.limit = 10;
            } else {
                req.body.limit = parseInt(req.body.limit);
            }
            const products = await productRepo.productList(req);
            if (!_.isEmpty(products)) {
                res.status(200).send({ status: 200, data: products.docs, total: products.total, limit: products.limit, page: products.page, pages: products.pages, message: 'Products fetched successfully' });
            }
            else {
                res.status(400).send({ status: 400, data: [], message: 'No Products found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async productUpdate(req, res) {
        try {
            const productInfo = await ProductDetails.findOne({ _id: req.params.id });
            if (!_.isEmpty(productInfo) && productInfo._id) {

                if (req.files && req.files.length > 0) {

                    var photo, image_1, image_2, image_3;

                    for (let i = 0; i < req.files.length; i++) {
                        const element = req.files[i];
                        if (element.fieldname === 'photo') {
                            photo = element.path;
                            const uploadResultLogo = await cloudinary.v2.uploader.upload(photo);
                            req.body.photo = uploadResultLogo.secure_url;
                        }
                        if (element.fieldname === 'image_1') {
                            image_1 = element.path;
                            const uploadResultFaviconLogo = await cloudinary.v2.uploader.upload(image_1);
                            req.body.image_1 = uploadResultFaviconLogo.secure_url;
                        }
                        if (element.fieldname === 'image_2') {
                            image_2 = element.path;
                            const uploadResultFaviconLogo = await cloudinary.v2.uploader.upload(image_2);
                            req.body.image_2 = uploadResultFaviconLogo.secure_url;
                        }
                        if (element.fieldname === 'image_3') {
                            image_3 = element.path;
                            const uploadResultFaviconLogo = await cloudinary.v2.uploader.upload(image_3);
                            req.body.image_3 = uploadResultFaviconLogo.secure_url;
                        }
                    }
                }
                else {
                    req.body.photo = productInfo.photo;
                    req.body.image_1 = productInfo.image_1;
                    req.body.image_2 = productInfo.image_2;
                    req.body.image_3 = productInfo.image_3;
                }

                let productUpdate = await productRepo.updateById(req.body, req.params.id);
                if (!_.isEmpty(productUpdate) && productUpdate._id) {
                    res.status(200).send({ status: 200, data: productUpdate, message: 'Product has been updated successfully' });
                } else {
                    res.status(400).send({ status: 400, data: {}, message: 'Product could not be updated' });
                }
            } else {
                res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async productDelete(req, res) {
        try {
            const product_id = new mongoose.Types.ObjectId(req.params.id);
            const productInfo = await Product.findOne({ _id: req.params.id });
            console.log('product', productInfo)
            if (!_.isEmpty(productInfo) && productInfo._id) {
                let productRemove = await productRepo.delete(product_id);
                console.log('productRemove', productRemove);
                if (!_.isEmpty(productRemove) && productRemove._id) {
                    // let productId = productRemove.product_id;
                    // let deleteData = await productRepo.deleteProduct(productId);
                    res.status(200).send({ status: 200, data: productRemove, message: 'Product has been removed successfully' });
                } else {
                    res.status(400).send({ status: 400, data: {}, message: 'Sorry, unable to update product at this moment' });
                }
            } else {
                res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };
}

module.exports = new productController();