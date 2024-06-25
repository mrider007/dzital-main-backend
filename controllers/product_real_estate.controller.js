const mongoose = require('mongoose');
const Property = require('../models/product_real_estate.model');
const Product = require('../models/product.model');
const AttributeValue = require('../models/attribute_value.model');
const productRepo = require('../repositories/product.repository');
const propertyRepo = require('../repositories/product_real_estate.repository');
const cloudinary = require('cloudinary');

class propertyController {
    constructor() { }

    async add(req, res) {
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
            let real_estate_product_save = await Property.create(req.body);
            if (!_.isEmpty(real_estate_product_save) && real_estate_product_save._id) {
                //let productUpdate = await productRepo.updateProductById({ image: real_estate_product_save.photo }, real_estate_product_save.product_id);

                let attribute_values = [];

                for (let x = 0; x < req.body.attributeData.length; x++) {

                    req.body.attributeData[x].product_id = req.body.product_id;

                    let attributeData = await AttributeValue.create(req.body.attributeData[x]);
                    if (!_.isEmpty(attributeData)) {
                        attribute_values.push(attributeData);
                    }
                }

                let update_obj = { image: real_estate_product_save.photo }
                if (req.body.bid_now === true || req.body.bid_now === "true") {
                    update_obj.bid_now = req.body.bid_now
                    update_obj.bid_start_price = req.body.bid_start_price
                    update_obj.bid_increament_value = req.body.bid_increament_value
                    update_obj.bid_entry = Number(req.body.bid_start_price) + Number(req.body.bid_increament_value)
                    update_obj.bid_start_date = req.body.bid_start_date
                    update_obj.bid_end_date = req.body.bid_end_date
                }
                let productUpdate = await productRepo.updateProductById(update_obj, real_estate_product_save.product_id);

                res.status(200).send({ status: 200, data: real_estate_product_save, message: 'Real Estate Product Saved Successfully' });
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'Real Estate Product could not be added' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async details(req, res) {
        try {
            if (_.has(req.query, 'userId')) {
                const userId = new mongoose.Types.ObjectId(req.query.userId);
                const property_id = new mongoose.Types.ObjectId(req.params.id);
                const propertyInfo = await propertyRepo.getRealEstateDetails({ _id: property_id }, userId);
                if (!_.isEmpty(propertyInfo) && propertyInfo._id) {
                    res.status(200).send({ status: 200, data: propertyInfo, message: 'Real Estate Details has been fetched Successfully' });
                }
                else {
                    res.status(400).send({ status: 400, data: {}, message: 'Real Estate Not Found' });
                }
            }
            else {
                const property_id = new mongoose.Types.ObjectId(req.params.id);
                const propertyInfo = await propertyRepo.getRealEstateDetails({ _id: property_id });
                if (!_.isEmpty(propertyInfo) && propertyInfo._id) {
                    res.status(200).send({ status: 200, data: propertyInfo, message: 'Real Estate Details has been fetched Successfully' });
                }
                else {
                    res.status(400).send({ status: 400, data: {}, message: 'Real Estate Not Found' });
                }
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async productRealEstateList(req, res) {
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

            if (_.has(req.body, 'userId')) {
                const userId = new mongoose.Types.ObjectId(req.body.userId);
                let properties = await propertyRepo.getAll(req, userId);
                if (!_.isEmpty(properties)) {
                    res.status(200).send({ status: 200, data: properties.docs, total: properties.total, limit: properties.limit, page: properties.page, pages: properties.pages, message: 'Real Estate Product List has been fetched Successfully' });
                }
                else {
                    res.status(201).send({ status: 201, data: [], message: 'No Real Estate Found' });
                }
            }
            else {
                let properties = await propertyRepo.list(req);
                if (!_.isEmpty(properties)) {
                    res.status(200).send({ status: 200, data: properties.docs, total: properties.total, limit: properties.limit, page: properties.page, pages: properties.pages, message: 'Real Estate Product List has been fetched Successfully' });
                }
                else {
                    res.status(201).send({ status: 201, data: [], message: 'No Real Estate Found' });
                }
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async RealEstateProductsBulkUpdate(req, res) {
        try {
            let productsUpdate = await Property.updateMany({}, { $set: { 'price': 1 } });
            res.status(200).send({ status: 200, data: productsUpdate, message: 'Real Estate Products Updated Successfully' });
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };
}

module.exports = new propertyController();