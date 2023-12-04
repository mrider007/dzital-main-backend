const mongoose = require('mongoose');
const Property = require('../models/property.model');
const Product = require('../models/product.model');
const propertyRepo = require('../repositories/property.repository');

class propertyController {
    constructor() { }

    async add(req, res) {
        try {
            req.body.userId = req.user._id;
            let productSave = await Product.create(req.body);
            if (!_.isEmpty(productSave) && productSave._id) {
                req.body.user_id = productSave.userId;
                req.body.product_id = productSave._id;
                let propertySave = await Property.create(req.body);
                if (!_.isEmpty(propertySave) && propertySave._id) {
                    res.status(200).send({ status: 200, data: propertySave, message: 'Property has been added successfully' });
                }
                //res.status(200).send({ status: 200, data: propertyCheck, message: 'Property has been added successfully' });
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'Property could not be added' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async details(req, res) {
        try {
            const property_id = new mongoose.Types.ObjectId(req.params.id);
            const propertyInfo = await Property.findOne({ _id: property_id });
            if (!_.isEmpty(propertyInfo) && propertyInfo._id) {
                res.status(200).send({ status: 200, data: propertyInfo, message: 'Property details has been fetched successfully' });
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'Property not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

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

            let properties = await propertyRepo.list(req);
            if (!_.isEmpty(properties)) {
                res.status(200).send({ status: 200, data: properties.docs, total: properties.total, limit: properties.limit, page: properties.page, pages: properties.pages, message: 'Property list has been fetched successfully' });
            }
            else {
                res.status(201).send({ status: 201, data: {}, message: 'No property found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };
}

module.exports = new propertyController();