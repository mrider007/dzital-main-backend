const mongoose = require('mongoose');
const ProductElectronics = require('../models/product_electronics.model');
const electronicsRepo = require('../repositories/product_electronics.repository');
const productRepo = require('../repositories/product.repository');

class ProductElectronicsController {
    constructor() { }

    async list(req, res) {
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
            const electronics = await electronicsRepo.List(req);
            if (!_.isEmpty(electronics)) {
                res.status(200).send({ status: 200, data: electronics.docs, total: electronics.total, limit: electronics.limit, page: electronics.page, pages: electronics.pages, message: 'Electronic Products fetched successfully' });
            }
            else {
                res.status(201).send({ status: 201, data: [], message: 'No Products found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async details(req, res) {
        try {
            const electronic_id = new mongoose.Types.ObjectId(req.params.id);
            let electronicsInfo = await electronicsRepo.getDetails({ _id: electronic_id });
            if (!_.isEmpty(electronicsInfo) && electronicsInfo._id) {
                res.status(200).send({ status: 200, data: electronicsInfo, message: 'Electronic product details has been fetched successfully' });
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async ElectronicsProductsBulkUpdate(req, res) {
        try {
            let productsUpdate = await ProductElectronics.updateMany({}, { $set: { 'sub_category_id': null } });
            res.status(200).send({ status: 200, data: productsUpdate, message: 'Electronics Products Updated Successfully' });
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** User Electronics Product Add */
    async ElectronicsProductAdd(req, res) {
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
            req.body.user_id = req.user._id;
            let electronicsProductSave = await ProductElectronics.create(req.body);
            if (!_.isEmpty(electronicsProductSave) && electronicsProductSave._id) {
                let productUpdate = await productRepo.updateProductById({ image: electronicsProductSave.image }, electronicsProductSave.product_id);
                res.status(200).send({ status: 200, data: lessoncoursesData, message: 'Electronics Product Saved Successfully' });
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'Electronics Product could not be added' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

}

module.exports = new ProductElectronicsController();