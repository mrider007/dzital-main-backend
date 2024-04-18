const mongoose = require('mongoose');
const ProductFashion = require('../models/product_fashion.model');
const AttributeValue = require('../models/attribute_value.model');
const fashionRepo = require('../repositories/product_fashion.repository');
const productRepo = require('../repositories/product.repository');
const cloudinary = require('cloudinary');

class productFashionController {
    constructor() { }

    async list(req, res) {
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

            const fashion = await fashionRepo.list(req);
            if (!_.isEmpty(fashion)) {
                res.status(200).send({ status: 200, data: fashion.docs, total: fashion.total, limit: fashion.limit, page: fashion.page, pages: fashion.pages, message: 'Fashion Products fetched successfully' });
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
            if (_.has(req.query, 'userId')) {
                const userId = new mongoose.Types.ObjectId(req.query.userId);
                const fashion_id = new mongoose.Types.ObjectId(req.params.id);
                const FashionProduct = await fashionRepo.getDetails({ _id: fashion_id }, userId);
                if (!_.isEmpty(FashionProduct)) {
                    res.status(200).send({ status: 200, data: FashionProduct, message: 'Fashion Product details fetched successfully' });
                }
                else {
                    res.status(400).send({ status: 400, message: 'Product Not Found' });
                }
            }
            else {
                const fashion_id = new mongoose.Types.ObjectId(req.params.id);
                const FashionProduct = await fashionRepo.getDetails({ _id: fashion_id });
                if (!_.isEmpty(FashionProduct)) {
                    res.status(200).send({ status: 200, data: FashionProduct, message: 'Fashion Product details fetched successfully' });
                }
                else {
                    res.status(400).send({ status: 400, message: 'Product Not Found' });
                }
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async FashionProductsBulkUpdate(req, res) {
        try {
            let productsUpdate = await ProductFashion.updateMany({}, { $set: { 'sub_category_id': null } });
            res.status(200).send({ status: 200, data: productsUpdate, message: 'Fashion Products Updated Successfully' });
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** User Fashion Product Create */
    async FashionProductCreate(req, res) {
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
            let fashionProductSave = await ProductFashion.create(req.body);
            if (!_.isEmpty(fashionProductSave) && fashionProductSave._id) {

                let attribute_values = [];

                for (let x = 0; x < req.body.attributeData.length; x++) {

                    req.body.attributeData[x].product_id = req.body.product_id;

                    let attributeData = await AttributeValue.create(req.body.attributeData[x]);
                    if (!_.isEmpty(attributeData)) {
                        attribute_values.push(attributeData);
                    }
                }
                let update_obj = { image: fashionProductSave.photo }
                if (req.body.bid_now === true || req.body.bid_now === "true") {
                    update_obj.bid_now = req.body.bid_now
                    update_obj.bid_start_price = req.body.bid_start_price
                    update_obj.bid_increament_value = req.body.bid_increament_value
                    update_obj.bid_entry = Number(req.body.bid_start_price) + Number(req.body.bid_increament_value)
                    update_obj.bid_start_date = req.body.bid_start_date
                    update_obj.bid_end_date = req.body.bid_end_date
                }
                let productUpdate = await productRepo.updateProductById(update_obj, fashionProductSave.product_id);
                res.status(200).send({ status: 200, data: fashionProductSave, message: 'Fashion Product Saved Successfully' });
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'Fashion Product could not be added' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

}

module.exports = new productFashionController();