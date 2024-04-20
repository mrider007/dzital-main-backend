const mongoose = require('mongoose');
const Freelancer = require('../models/product_freelancer.model');
const AttributeValue = require('../models/attribute_value.model');
const productRepo = require('../repositories/product.repository');
const freelancerRepo = require('../repositories/product_freelancer.repository');
const cloudinary = require('cloudinary');

class freelancerController {
    constructor() { }

    /** User Freelancer Post */
    async add(req, res) {
        try {
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
            req.body.user_id = req.user._id;
            let freelancerData = await Freelancer.create(req.body);
            if (!_.isEmpty(freelancerData) && freelancerData._id) {

                let attribute_values = [];

                for (let x = 0; x < req.body.attributeData.length; x++) {

                    req.body.attributeData[x].product_id = req.body.product_id;

                    let attributeData = await AttributeValue.create(req.body.attributeData[x]);
                    if (!_.isEmpty(attributeData)) {
                        attribute_values.push(attributeData);
                    }
                }
                let productUpdate = await productRepo.updateProductById({ image: freelancerData.image }, freelancerData.product_id);
                res.status(200).send({ status: 200, data: freelancerData, message: 'Freelancer Product Added Successfully' });
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'Freelancer Product could not be saved' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async details(req, res) {
        try {
            if (_.has(req.query, 'userId')) {
                const userId = new mongoose.Types.ObjectId(req.query.userId);
                const freelancer_id = new mongoose.Types.ObjectId(req.params.id);
                let freelancerInfo = await freelancerRepo.getDetails({ _id: freelancer_id }, userId);
                if (!_.isEmpty(freelancerInfo) && freelancerInfo._id) {
                    res.status(200).send({ status: 200, data: freelancerInfo, message: 'Product Freelancer details has been fetched successfully' });
                }
                else {
                    res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
                }
            }
            else {
                const freelancer_id = new mongoose.Types.ObjectId(req.params.id);
                let freelancerInfo = await freelancerRepo.getDetails({ _id: freelancer_id });
                if (!_.isEmpty(freelancerInfo) && freelancerInfo._id) {
                    res.status(200).send({ status: 200, data: freelancerInfo, message: 'Product Freelancer details has been fetched successfully' });
                }
                else {
                    res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
                }
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
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
            if (_.has(req.body, 'userId')) {
                const userId = new mongoose.Types.ObjectId(req.body.userId);
                const freelancer = await freelancerRepo.getAll(req, userId);
                if (!_.isEmpty(freelancer)) {
                    res.status(200).send({ status: 200, data: freelancer.docs, total: freelancer.total, limit: freelancer.limit, page: freelancer.page, pages: freelancer.pages, message: 'Freelancer Products fetched successfully' });
                } else {
                    res.status(201).send({ status: 201, data: [], message: 'No Products Found' });
                }
            }
            else {
                const freelancer = await freelancerRepo.list(req);
                if (!_.isEmpty(freelancer)) {
                    res.status(200).send({ status: 200, data: freelancer.docs, total: freelancer.total, limit: freelancer.limit, page: freelancer.page, pages: freelancer.pages, message: 'Freelancer Products fetched successfully' });
                } else {
                    res.status(201).send({ status: 201, data: [], message: 'No Products Found' });
                }
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async FreelancerProductsBulkUpdate(req, res) {
        try {
            let productsUpdate = await Freelancer.updateMany({}, { $set: { 'sub_category_id': null } });
            res.status(200).send({ status: 200, data: productsUpdate, message: 'Freelancer Products Updated Successfully' });
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

}

module.exports = new freelancerController();