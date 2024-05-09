const mongoose = require('mongoose');
const Service = require('../models/service_category.model');
const serviceRepo = require('../repositories/service_category.repository');

class serviceController {
    constructor() { }

    /** Service Sub Category Add */
    async serviceAdd(req, res) {
        try {
            let serviceCheck = await Service.findOne({ title: req.body.title });
            if (!_.isEmpty(serviceCheck) && serviceCheck._id) {
                res.status(400).send({ status: 400, data: {}, message: 'Service already exists' });
            } else {
                let saveService = await Service.create(req.body);
                if (!_.isEmpty(saveService) && saveService._id) {
                    res.status(200).send({ status: 200, data: saveService, message: 'Sub Category added successfully' });
                } else {
                    res.status(400).send({ status: 400, message: 'Sub Category could not be added' });
                }
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async serviceList(req, res) {
        try {
            let services = await Service.find({ parentId: null });
            if (!_.isEmpty(services)) {
                res.status(200).send({ status: 200, data: services, message: 'Categories list fetched successfully' });
            } else {
                res.status(400).send({ status: 400, data: [], message: 'No Category found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** Admin Service Sub Category List */
    async adminSubCategoryList(req, res) {
        try {
            if (!_.has(req.body, 'parentId')) {
                res.status(400).send({ status: 400, message: 'Parent Id is Required' });
            }
            else {
                let sub_category = await serviceRepo.getSubCategories(req);
                if (!_.isEmpty(sub_category)) {
                    res.status(200).send({ status: 200, data: sub_category.docs, total: sub_category.total, limit: sub_category.limit, page: sub_category.page, pages: sub_category.pages, message: 'Service Sub Category List fetched successfully' });
                }
                else {
                    res.status(400).send({ status: 400, message: 'No Sub Category Found' });
                }
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** User Service Sub Category List */
    async SubCategoryList(req, res) {
        try {
            if (!_.has(req.body, 'parentId')) {
                res.status(400).send({ status: 400, message: 'Parent Id is Required' });
            }
            else {
                const parent_id = new mongoose.Types.ObjectId(req.body.parentId);
                let service_sub_category = await Service.find({ parentId: parent_id });
                if (!_.isEmpty(service_sub_category)) {
                    res.status(200).send({ status: 200, data: service_sub_category, message: 'Service Sub Category List fetched successfully' });
                }
                else {
                    res.status(400).send({ status: 400, message: 'No Sub Category Found' });
                }
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** Admin service categories list */
    async serviceCatergories(req, res) {
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

            let categories = await serviceRepo.getCategories(req);
            if (!_.isEmpty(categories)) {
                res.status(200).send({ status: 200, data: categories.docs, total: categories.total, limit: categories.limit, page: categories.page, pages: categories.pages, message: 'Categories list fetched successfully' });
            }
            else {
                res.status(201).send({ status: 201, data: [], message: 'No category found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** Service Sub Category Update */
    async serviceUpdate(req, res) {
        try {
            let service_id = new mongoose.Types.ObjectId(req.params.id);
            let serviceInfo = await Service.findOne({ _id: service_id });
            if (!_.isEmpty(serviceInfo) && serviceInfo._id) {
                let serviceUpdate = await serviceRepo.updateById(req.body, service_id);
                if (!_.isEmpty(serviceUpdate) && serviceUpdate._id) {
                    res.status(200).send({ status: 200, data: serviceUpdate, message: 'Sub Category has been updated successfully' });
                }
                else {
                    res.status(400).send({ status: 400, message: 'Sub Category could not be updated' });
                }
            } else {
                res.status(400).send({ status: 400, message: 'Sub Category not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async serviceDelete(req, res) {
        try {
            let service_id = new mongoose.Types.ObjectId(req.params.id);
            let serviceInfo = await Service.findOne({ _id: service_id });
            if (!_.isEmpty(serviceInfo) && serviceInfo._id) {
                let serviceDelete = await serviceRepo.delete(service_id);
                if (!_.isEmpty(serviceDelete) && serviceDelete._id) {
                    res.status(200).send({ status: 200, data: serviceDelete, message: 'Sub Category has been removed successfully' });
                }
                else {
                    res.status(400).send({ status: 400, message: 'Sub Category not removed' });
                }
            } else {
                res.status(400).send({ status: 400, messaage: 'Sub Category not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async serviceDetails(req, res) {
        try {
            let service_id = new mongoose.Types.ObjectId(req.params.id);
            let serviceInfo = await Service.findOne({ _id: service_id });
            if (!_.isEmpty(serviceInfo) && serviceInfo._id) {
                res.status(200).send({ status: 200, data: serviceInfo, message: 'Sub Category details fetched successfully' });
            }
            else {
                res.status(400).send({ status: 400, message: 'Sub Category not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };
}

module.exports = new serviceController();