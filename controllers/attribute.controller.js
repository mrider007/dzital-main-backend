const mongoose = require('mongoose');
const Attribute = require('../models/attribute.model');
const attributeRepo = require('../repositories/attribute.repository');

class attributeController {
    constructor() { }

    /** Admin Sub Category Attribute Add */
    async attributeAdd(req, res) {
        try {
            let attributeSave = await Attribute.create(req.body);
            if (!_.isEmpty(attributeSave) && attributeSave._id) {
                res.status(200).send({ status: 200, data: attributeSave, message: 'Attribute has been added successfully' });
            }
            else {
                res.status(400).send({ status: 400, message: 'Attribute not added' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** Admin Attribute Details */
    async attributeDetails(req, res) {
        try {
            let attributeDetails = await attributeRepo.getAttributeDetails(req);
            if (!_.isEmpty(attributeDetails)) {
                res.status(200).send({ status: 200, data: attributeDetails, message: 'Attribute details fetched successfully' });
            } else {
                res.status(400).send({ status: 400, message: 'Attribute not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** Admin Sub Category Attribute List */
    async attributeList(req, res) {
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

            let attributes = await attributeRepo.getAttributes(req);
            if (!_.isEmpty(attributes)) {
                res.status(200).send({ status: 200, data: attributes.docs, total: attributes.total, limit: attributes.limit, page: attributes.page, pages: attributes.pages, message: 'Attribute list fetched successfully' });
            }
            else {
                res.status(201).send({ status: 201, data: [], message: 'No attributes found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** Admin Attribute Update */
    async update(req, res) {
        try {
            const attribute_id = new mongoose.Types.ObjectId(req.params.id);
            let attributeInfo = await Attribute.findOne({ _id: attribute_id });
            if (!_.isEmpty(attributeInfo) && attributeInfo._id) {
                let attributeUpdate = await attributeRepo.updateById(req.body, attribute_id);
                if (!_.isEmpty(attributeUpdate) && attributeUpdate._id) {
                    res.status(200).send({ status: 200, data: attributeUpdate, message: 'Attribute updated successfully' });
                }
                else {
                    res.status(400).send({ status: 400, message: 'Attribute could not be updated' });
                }
            } else {
                res.status(400).send({ status: 400, message: 'Attribute not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** Admin Attribute Delete */
    async delete(req, res) {
        try {
            let attribute_id = new mongoose.Types.ObjectId(req.params.id);
            let attributeInfo = await Attribute.findOne({ _id: attribute_id });
            if (!_.isEmpty(attributeInfo) && attributeInfo._id) {
                let attributeDelete = await attributeRepo.delete(attribute_id);
                if (!_.isEmpty(attributeDelete) && attributeDelete._id) {
                    res.status(200).send({ status: 200, data: attributeDelete, message: 'Attribute removed successfully' });
                }
                else {
                    res.status(400).send({ status: 400, message: 'Attribute not removed' });
                }
            } else {
                res.status(400).send({ status: 400, messaage: 'Attribute not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async bulkUpdate(req, res) {
        try {
            let bulkUpdate = await Attribute.updateMany({}, { $set: { 'options': [] } });
            res.send({ status: 200, data: bulkUpdate, message: 'Attributes updated successfully' });
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    };

    /** User side attribute list */
    async userAttributeList(req, res) {
        try {
            let attributes = await attributeRepo.getAllAttributes(req);
            if (!_.isEmpty(attributes)) {
                res.status(200).send({ status: 200, data: attributes, message: 'Attribute List fetched successfully' });
            }
            else {
                res.status(400).send({ status: 400, messaage: 'No Attributes Found' });
            }
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    };

    /** Attribute Filter List */
    async filterList(req, res) {
        try {
            let filters = await attributeRepo.getFilterList(req)
            if (!_.isEmpty(filters)) {
                res.status(200).send({ status: 200, data: filters, message: 'Job Filter List fetched Successfully' });
            } else {
                res.status(201).send({ status: 201, data: [], message: 'No Filters Found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message })
        }
    }

}

module.exports = new attributeController();