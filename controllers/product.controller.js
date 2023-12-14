const Product = require('../models/product.model');
const ProductElectronics = require('../models/product_electronics.model');
const Goods = require('../models/product_goods.model');
const Fashion = require('../models/product_fashion.model');
const Property = require('../models/product_real_estate.model');
const Job = require('../models/product_jobs.model');
const Category = require('../models/service_master.model');
const mongoose = require('mongoose');
const productRepo = require('../repositories/product.repository');
const cloudinary = require('cloudinary');

class productController {
    constructor() { }

    /** Admin Product Add */
    async productAdd(req, res) {
        try {
            let productSave = await Product.create(req.body);
            if (!_.isEmpty(productSave) && productSave._id) {
                let categoryInfo = await Category.findOne({ _id: productSave.category_id });
                if (categoryInfo.title === 'Jobs') {
                    req.body.product_id = productSave._id;
                    let jobData = await Job.create(req.body);
                    if (!_.isEmpty(jobData) && jobData._id) {
                        res.status(200).send({ status: 200, data: jobData, message: 'Product saved successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product could not be added' });
                    }
                }
                else if (categoryInfo.title === 'Real Estate') {
                    req.body.product_id = productSave._id;
                    let propertyData = await Property.create(req.body);
                    if (!_.isEmpty(propertyData) && propertyData._id) {
                        res.status(200).send({ status: 200, data: propertyData, message: 'Product saved successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product could not be added' });
                    }
                }
                else if (categoryInfo.title === 'Electronics') {

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
                    req.body.product_id = productSave._id;
                    let ElectronicsData = await ProductElectronics.create(req.body);
                    if (!_.isEmpty(ElectronicsData) && ElectronicsData._id) {
                        res.status(200).send({ status: 200, data: ElectronicsData, message: 'Product saved successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product could not be added' });
                    }
                }
                else if (categoryInfo.title === 'Goods of all kinds') {

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
                    req.body.product_id = productSave._id;
                    let GoodsSave = await Goods.create(req.body);
                    if (!_.isEmpty(GoodsSave) && GoodsSave._id) {
                        res.status(200).send({ status: 200, data: GoodsSave, message: 'Product saved successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product could not be added' });
                    }
                }
                else if (categoryInfo.title === 'Fashion & Beauty') {

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
                    req.body.product_id = productSave._id;
                    let FashionSave = await Fashion.create(req.body);
                    if (!_.isEmpty(FashionSave) && FashionSave._id) {
                        res.status(200).send({ status: 200, data: FashionSave, message: 'Product saved successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product could not be added' });
                    }
                }
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'Product could not be added' });
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
                    let electronicsDetails = await ProductElectronics.findOne({ product_id: productInfo._id });
                    if (!_.isEmpty(electronicsDetails) && electronicsDetails._id) {
                        res.status(200).send({ status: 200, data: electronicsDetails, message: 'Product details has been fetched successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
                    }
                }
                else if (categoryInfo.title === 'Jobs') {
                    let jobDetails = await Job.findOne({ product_id: productInfo._id });
                    if (!_.isEmpty(jobDetails) && jobDetails._id) {
                        res.status(200).send({ status: 200, data: jobDetails, message: 'Product details has been fetched successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
                    }
                }
                else if (categoryInfo.title === 'Fashion & Beauty') {
                    let fashionDetails = await Fashion.findOne({ product_id: productInfo._id });
                    if (!_.isEmpty(fashionDetails) && fashionDetails._id) {
                        res.status(200).send({ status: 200, data: fashionDetails, message: 'Product details has been fetched successfully' });
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
            if (!_.isEmpty(productInfo) && productInfo._id) {
                let productRemove = await productRepo.delete(product_id);
                if (!_.isEmpty(productRemove) && productRemove._id) {
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