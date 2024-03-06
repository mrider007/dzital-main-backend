const Product = require('../models/product.model');
const ProductElectronics = require('../models/product_electronics.model');
const Goods = require('../models/product_goods.model');
const Fashion = require('../models/product_fashion.model');
const Property = require('../models/product_real_estate.model');
const Job = require('../models/product_jobs.model');
const ProductEducation = require('../models/product_education.model');
const Freelancer = require('../models/product_freelancer.model');
const Category = require('../models/service_master.model');
const mongoose = require('mongoose');
const productRepo = require('../repositories/product.repository');
const electronicsRepo = require('../repositories/product_electronics.repository');
const propertyRepo = require('../repositories/product_real_estate.repository');
const jobRepo = require('../repositories/product_job.repository');
const goodsRepo = require('../repositories/product_goods.repository');
const fashionRepo = require('../repositories/product_fashion.repository');
const freelancerRepo = require('../repositories/product_freelancer.repository');
const educationRepo = require('../repositories/product_education.repository');
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
                    if (req.files && req.files.length > 0) {
                        var photo;
                        for (let i = 0; i < req.files.length; i++) {
                            const element = req.files[i];
                            if (element.fieldname === 'image') {
                                photo = element.path;
                                const uploadImage = await cloudinary.v2.uploader.upload(photo);
                                req.body.image = uploadImage.secure_url;
                            }
                        }
                    }
                    req.body.product_id = productSave._id;
                    let jobData = await Job.create(req.body);
                    if (!_.isEmpty(jobData) && jobData._id) {
                        let productUpdate = await productRepo.updateProductById({ image: jobData.image }, productSave._id);
                        res.status(200).send({ status: 200, data: jobData, message: 'Product saved successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product could not be added' });
                    }
                }
                else if (categoryInfo.title === 'Real Estate') {

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
                    let propertyData = await Property.create(req.body);
                    if (!_.isEmpty(propertyData) && propertyData._id) {
                        let productUpdate = await productRepo.updateProductById({ image: propertyData.photo }, productSave._id);
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
                        let productUpdate = await productRepo.updateProductById({ image: ElectronicsData.photo }, productSave._id);
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
                        let productUpdate = await productRepo.updateProductById({ image: GoodsSave.photo }, productSave._id);
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
                        let productUpdate = await productRepo.updateProductById({ image: FashionSave.photo }, productSave._id);
                        res.status(200).send({ status: 200, data: FashionSave, message: 'Product saved successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product could not be added' });
                    }
                }
                else if (categoryInfo.title === 'Lessons & Courses') {
                    if (req.files && req.files.length > 0) {
                        var photo;
                        for (let i = 0; i < req.files.length; i++) {
                            const element = req.files[i];
                            if (element.fieldname === 'image') {
                                photo = element.path;
                                const uploadImage = await cloudinary.v2.uploader.upload(photo);
                                req.body.image = uploadImage.secure_url;
                            }
                        }
                    }
                    req.body.product_id = productSave._id;
                    let lessoncoursesData = await ProductEducation.create(req.body);
                    if (!_.isEmpty(lessoncoursesData) && lessoncoursesData._id) {
                        let productUpdate = await productRepo.updateProductById({ image: lessoncoursesData.image }, productSave._id);
                        res.status(200).send({ status: 200, data: lessoncoursesData, message: 'Product saved successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product could not be added' });
                    }
                }
                else if (categoryInfo.title === 'Freelancer') {
                    if (req.files && req.files.length > 0) {
                        var photo;
                        for (let i = 0; i < req.files.length; i++) {
                            const element = req.files[i];
                            if (element.fieldname === 'image') {
                                photo = element.path;
                                const uploadImage = await cloudinary.v2.uploader.upload(photo);
                                req.body.image = uploadImage.secure_url;
                            }
                        }
                    }
                    req.body.product_id = productSave._id;
                    let freelancerData = await Freelancer.create(req.body);
                    if (!_.isEmpty(freelancerData) && freelancerData._id) {
                        let productUpdate = await productRepo.updateProductById({ image: freelancerData.image }, productSave._id);
                        res.status(200).send({ status: 200, data: freelancerData, message: 'Product saved successfully' });
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
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** Admin All Product List */
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
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async approvedProductList(req, res) {
        try {
            if (!req.body.page) {
                req.body.page = 1;
            }
            else {
                req.body.page = parseInt(req.body.page);
            }

            if (!req.body.limit) {
                req.body.limit = 10;
            }
            else {
                req.body.limit = parseInt(req.body.limit);
            }
            let products = await productRepo.approvedProducts(req);
            if (!_.isEmpty(products)) {
                res.status(200).send({ status: 200, data: products.docs, total: products.total, limit: products.limit, page: products.page, pages: products.pages, message: 'Approved Products list fetched successfully' });
            } else {
                res.status(400).send({ status: 400, data: [], message: 'No Approved Products found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** Admin Unapproved Products List */
    async unapprovedProductList(req, res) {
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
            let products = await productRepo.unapprovedProducts(req);
            if (!_.isEmpty(products)) {
                res.status(200).send({ status: 200, data: products.docs, total: products.total, limit: products.limit, page: products.page, pages: products.pages, message: 'Unapproved Products list fetched successfully' });
            } else {
                res.status(400).send({ status: 400, data: [], message: 'No Unapprved Products Found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** Admin Rejected Product List */
    async rejectedProductList(req, res) {
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
            let products = await productRepo.rejectedProducts(req);
            if (!_.isEmpty(products)) {
                res.status(200).send({ status: 200, data: products.docs, total: products.total, limit: products.limit, page: products.page, pages: products.pages, message: 'Rejected Products list fetched successfully' });
            } else {
                res.status(400).send({ status: 400, data: [], message: 'No products found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** Admin Product Details */
    async productDetails(req, res) {
        try {
            const productInfo = await Product.findOne({ _id: req.params.id });
            if (!_.isEmpty(productInfo) && productInfo._id) {
                let categoryInfo = await Category.findOne({ _id: productInfo.category_id });
                if (categoryInfo.title === 'Real Estate') {
                    let propertyDetails = await propertyRepo.getPropertyDetails({ product_id: productInfo._id });
                    if (!_.isEmpty(propertyDetails) && propertyDetails._id) {
                        res.status(200).send({ status: 200, data: propertyDetails, message: 'Property details has been fetched successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
                    }
                }
                else if (categoryInfo.title === 'Electronics') {
                    let electronicsDetails = await electronicsRepo.getDetails({ product_id: productInfo._id });
                    if (!_.isEmpty(electronicsDetails) && electronicsDetails._id) {
                        res.status(200).send({ status: 200, data: electronicsDetails, message: 'Product details has been fetched successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
                    }
                }
                else if (categoryInfo.title === 'Jobs') {
                    let jobDetails = await jobRepo.getJobDetails({ product_id: productInfo._id });
                    if (!_.isEmpty(jobDetails) && jobDetails._id) {
                        res.status(200).send({ status: 200, data: jobDetails, message: 'Product details has been fetched successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
                    }
                }
                else if (categoryInfo.title === 'Fashion & Beauty') {
                    let fashionDetails = await fashionRepo.getDetails({ product_id: productInfo._id });
                    if (!_.isEmpty(fashionDetails) && fashionDetails._id) {
                        res.status(200).send({ status: 200, data: fashionDetails, message: 'Product details has been fetched successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
                    }
                }
                else if (categoryInfo.title === 'Goods of all kinds') {
                    let goodsDetails = await goodsRepo.getDetails({ product_id: productInfo._id });
                    if (!_.isEmpty(goodsDetails) && goodsDetails._id) {
                        res.status(200).send({ status: 200, data: goodsDetails, message: 'Product details has been fetched successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
                    }
                }
                else if (categoryInfo.title === 'Freelancer') {
                    let freelancerDetails = await freelancerRepo.getDetails({ product_id: productInfo._id });
                    if (!_.isEmpty(freelancerDetails) && freelancerDetails._id) {
                        res.status(200).send({ status: 200, data: goodsDetails, message: 'Product details has been fetched successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
                    }
                }
                else if (categoryInfo.title === 'Lessons & Courses') {
                    let lessonDetails = await ProductEducation.findOne({ product_id: productInfo._id });
                    if (!_.isEmpty(lessonDetails) && lessonDetails._id) {
                        res.status(200).send({ status: 200, data: lessonDetails, message: 'Product details has been fetched successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
                    }                                     
                }
            } else {
                res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
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
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** Admin Product Add */
    async productUpdate(req, res) {
        try {
            const productInfo = await Product.findOne({ _id: req.params.id });
            if (!_.isEmpty(productInfo) && productInfo._id) {
                let categoryInfo = await Category.findOne({ _id: productInfo.category_id });

                if (categoryInfo.title === 'Electronics') {
                    let electronicsInfo = await ProductElectronics.findOne({ product_id: productInfo._id });

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
                        req.body.photo = electronicsInfo.photo;
                        req.body.image_1 = electronicsInfo.image_1;
                        req.body.image_2 = electronicsInfo.image_2;
                        req.body.image_3 = electronicsInfo.image_3;
                    }

                    let electronicsUpdate = await electronicsRepo.updateById(req.body, electronicsInfo._id);
                    if (!_.isEmpty(electronicsUpdate) && electronicsUpdate._id) {
                        let productUpdate = await productRepo.updateProductById({ image: electronicsUpdate.photo }, req.params.id);
                        res.status(200).send({ status: 200, data: electronicsUpdate, message: 'Product has been updated successfully' });
                    } else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product could not be updated' });
                    }
                }
                else if (categoryInfo.title === 'Real Estate') {
                    let propertyInfo = await Property.findOne({ product_id: productInfo._id });

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
                        req.body.photo = propertyInfo.photo;
                        req.body.image_1 = propertyInfo.image_1;
                        req.body.image_2 = propertyInfo.image_2;
                        req.body.image_3 = propertyInfo.image_3;
                    }

                    let propertyUpdate = await propertyRepo.updateById(req.body, propertyInfo._id);
                    if (!_.isEmpty(propertyUpdate) && propertyUpdate._id) {
                        let productUpdate = await productRepo.updateProductById({ image: propertyUpdate.photo }, req.params.id);
                        res.status(200).send({ status: 200, data: propertyUpdate, message: 'Product has been updated successfully' });
                    } else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product could not be updated' });
                    }
                }
                else if (categoryInfo.title === 'Jobs') {
                    let jobDetails = await Job.findOne({ product_id: productInfo._id });
                    let jobUpdate = await jobRepo.updateById(req.body, jobDetails._id);
                    if (!_.isEmpty(jobUpdate) && jobUpdate._id) {
                        //let productUpdate = await productRepo.updateProductById({ image: electronicsUpdate.photo }, req.params.id);
                        res.status(200).send({ status: 200, data: jobUpdate, message: 'Product has been updated successfully' });
                    } else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product could not be updated' });
                    }
                }
                else if (categoryInfo.title === 'Goods of all kinds') {
                    let goodsInfo = await Goods.findOne({ product_id: productInfo._id });

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
                        req.body.photo = goodsInfo.photo;
                        req.body.image_1 = goodsInfo.image_1;
                        req.body.image_2 = goodsInfo.image_2;
                        req.body.image_3 = goodsInfo.image_3;
                    }

                    let goodsUpdate = await goodsRepo.updateById(req.body, goodsInfo._id);
                    if (!_.isEmpty(goodsUpdate) && goodsUpdate._id) {
                        let productUpdate = await productRepo.updateProductById({ image: goodsUpdate.photo }, req.params.id);
                        res.status(200).send({ status: 200, data: goodsUpdate, message: 'Product has been updated successfully' });
                    } else {
                        res.status(400).send({ status: 400, data: {}, message: 'Product could not be updated' });
                    }
                }
            } else {
                res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** Admin Product Delete */
    async productDelete(req, res) {
        try {
            const product_id = new mongoose.Types.ObjectId(req.params.id);
            const productInfo = await Product.findOne({ _id: req.params.id });
            if (!_.isEmpty(productInfo) && productInfo._id) {
                let productRemove = await productRepo.delete(product_id);
                let categoryInfo = await Category.findOne({ _id: productInfo.category_id });
                if (categoryInfo.title === 'Electronics') {
                    let electronics = await ProductElectronics.findOne({ product_id: productInfo._id });
                    let electronicsDelete = await electronicsRepo.delete(electronics._id);
                    if (!_.isEmpty(electronicsDelete) && electronicsDelete._id) {
                        res.status(200).send({ status: 200, data: electronicsDelete, message: 'Product has been removed successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, message: 'Product could not be removed' });
                    }
                }
                else if (categoryInfo.title === 'Jobs') {
                    let job = await Job.findOne({ product_id: productInfo._id });
                    let jobDelete = await jobRepo.delete(job._id);
                    if (!_.isEmpty(jobDelete) && jobDelete._id) {
                        res.status(200).send({ status: 200, data: jobDelete, message: 'Product has been removed successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, message: 'Product could not be removed' });
                    }
                }
                else if (categoryInfo.title === 'Freelancer') {
                    let freelancer = await Freelancer.findOne({ product_id: productInfo._id });
                    let freelancerDelete = await freelancerRepo.delete(freelancer._id);
                    if (!_.isEmpty(freelancerDelete) && freelancerDelete._id) {
                        res.status(200).send({ status: 200, data: freelancerDelete, message: 'Product has been removed successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, message: 'Product could not be removed' });
                    }
                }
                else if (categoryInfo.title === 'Real Estate') {
                    let property = await Property.findOne({ product_id: productInfo._id });
                    let propertyDelete = await propertyRepo.delete(property._id);
                    if (!_.isEmpty(propertyDelete) && propertyDelete._id) {
                        res.status(200).send({ status: 200, data: propertyDelete, message: 'Product has been removed successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, message: 'Product could not be removed' });
                    }
                }
                else if (categoryInfo.title === 'Fashion & Beauty') {
                    let fashion = await Fashion.findOne({ product_id: productInfo._id });
                    let fashionDelete = await fashionRepo.delete(fashion._id);
                    if (!_.isEmpty(fashionDelete) && fashionDelete._id) {
                        res.status(200).send({ status: 200, data: fashionDelete, message: 'Product has been removed successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, message: 'Product could not be removed' });
                    }
                }
                else if (categoryInfo.title === 'Goods of all kinds') {
                    let goods = await Goods.findOne({ product_id: productInfo._id });
                    let goodsDelete = await goodsRepo.delete(goods._id);
                    if (!_.isEmpty(goodsDelete) && goodsDelete._id) {
                        res.status(200).send({ status: 200, data: goodsDelete, message: 'Product has been removed successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, message: 'Product could not be removed' });
                    }
                }
                else if (categoryInfo.title === 'Lessons & Courses') {
                    let lesson_course = await ProductEducation.findOne({ product_id: productInfo._id });
                    let lessonDelete = await educationRepo.delete(lesson_course._id);
                    if (!_.isEmpty(lessonDelete) && lessonDelete._id) {
                        res.status(200).send({ status: 200, data: lessonDelete, message: 'Product has been removed successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, message: 'Product could not be removed' });
                    }
                }
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async changeStatus(req, res) {
        try {
            const product_id = new mongoose.Types.ObjectId(req.params.id);
            let productData = await Product.findOne({ _id: product_id });
            if (!_.isEmpty(productData) && productData._id) {
                let statusUpdate = await productRepo.updateProductById(req.body, productData._id);
                if (!_.isEmpty(statusUpdate) && statusUpdate._id) {
                    res.status(200).send({ status: 200, data: statusUpdate, message: 'Product status has been updated successfully' });
                }
                else {
                    res.status(400).send({ status: 400, data: {}, message: 'Product status could not be updated' });
                }
            } else {
                res.status(400).send({ status: 400, data: {}, message: 'Product not found!' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** Category wise Products List */
    async categoryWiseProducts(req, res) {
        try {
            if (!_.has(req.body, 'category_id')) {
                res.status(400).send({ status: 400, message: 'Category Id is required' });
            }
            else {
                const category_id = new mongoose.Types.ObjectId(req.body.category_id);
                const categoryDetails = await Category.findOne({ _id: category_id });
                if (!_.isEmpty(categoryDetails)) {
                    if (categoryDetails.title === 'Real Estate') {
                        let real_estate_products = await propertyRepo.list(req);
                        if (!_.isEmpty(real_estate_products)) {
                            res.status(200).send({ status: 200, data: real_estate_products.docs, total: real_estate_products.total, limit: real_estate_products.limit, page: real_estate_products.page, pages: real_estate_products.pages, message: 'Real Estate Products fetched successfully' });
                        }
                        else {
                            res.status(400).send({ status: 400, data: {}, message: 'No Real Estate Products found' });
                        }
                    }
                    else if (categoryDetails.title === 'Jobs') {
                        let job_products = await jobRepo.List(req);
                        if (!_.isEmpty(real_estate_products)) {
                            res.status(200).send({ status: 200, data: job_products.docs, total: job_products.total, limit: job_products.limit, page: job_products.page, pages: job_products.pages, message: 'Job Products fetched successfully' });
                        }
                        else {
                            res.status(400).send({ status: 400, data: {}, message: 'No Job Products found' });
                        }
                    }
                    else if (categoryDetails.title === 'Freelancer') {
                        let freelancer_products = await freelancerRepo.list(req);
                        if (!_.isEmpty(freelancer_products)) {
                            res.status(200).send({ status: 200, data: freelancer_products.docs, total: freelancer_products.total, limit: freelancer_products.limit, page: freelancer_products.page, pages: freelancer_products.pages, message: 'Freelancer Products fetched successfully' });
                        }
                        else {
                            res.status(400).send({ status: 400, data: {}, message: 'No Freelancer Products found' });
                        }
                    }
                    else if (categoryDetails.title === 'Lessons & Courses') {
                        let course_products = await educationRepo.list(req);
                        if (!_.isEmpty(course_products)) {
                            res.status(200).send({ status: 200, data: course_products.docs, total: course_products.total, limit: course_products.limit, page: course_products.page, pages: course_products.pages, message: 'Lesson & Courses Products fetched successfully' });
                        }
                        else {
                            res.status(400).send({ status: 400, data: {}, message: 'No Lesson & Courses Products found' });
                        }
                    }
                    else if (categoryDetails.title === 'Electronics') {
                        let electronics_products = await electronicsRepo.List(req);
                        if (!_.isEmpty(electronics_products)) {
                            res.status(200).send({ status: 200, data: electronics_products.docs, total: electronics_products.total, limit: electronics_products.limit, page: electronics_products.page, pages: electronics_products.pages, message: 'Electronics Products fetched successfully' });
                        }
                        else {
                            res.status(400).send({ status: 400, data: {}, message: 'No Electronics Products found' });
                        }
                    }
                    else if (categoryDetails.title === 'Fashion & Beauty') {
                        let fashion_products = await fashionRepo.list(req);
                        if (!_.isEmpty(fashion_products)) {
                            res.status(200).send({ status: 200, data: fashion_products.docs, total: fashion_products.total, limit: fashion_products.limit, page: fashion_products.page, pages: fashion_products.pages, message: 'Fashion & Beauty Products fetched successfully' });
                        }
                        else {
                            res.status(400).send({ status: 400, data: {}, message: 'No Fashion & Beauty Products found' });
                        }
                    }
                    else if (categoryDetails.title === 'Goods of all kinds') {
                        let goods_products = await goodsRepo.List(req);
                        if (!_.isEmpty(goods_products)) {
                            res.status(200).send({ status: 200, data: goods_products.docs, total: goods_products.total, limit: goods_products.limit, page: goods_products.page, pages: goods_products.pages, message: 'Goods of all kinds Products fetched successfully' });
                        }
                        else {
                            res.status(400).send({ status: 400, data: {}, message: 'No Goods of all kinds Products found' });
                        }
                    }
                }
                else {
                    res.status(400).send({ status: 400, data: {}, message: 'Category not found' });
                }
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async productsBulkUpdate(req, res) {
        try {
            let productsUpdate = await Product.updateMany({}, { $set: { 'sub_category_id': null } });
            res.status(200).send({ status: 200, data: productsUpdate, message: 'Products Updated Successfully' });
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** User New Product Add */
    async userProductAdd(req, res) {
        try {
            req.body.userId = req.user._id;
            let productSave = await Product.create(req.body);
            if (!_.isEmpty(productSave)) {
                res.status(200).send({ status: 200, data: productSave, message: 'Product Created Successfully' });
            }
            else {
                res.status(400).send({ status: 400, message: 'Product Not Created' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };
}

module.exports = new productController();