const mongoose = require('mongoose');
const AttributeOption = require('../models/attribute_option.model');
const attributeoptionRepo = require('../repositories/attribute_option.controller');

class attributeOptionController {
    constructor() { }

    /** Admin Attribute Option Add */
    async attributeOptionAdd(req, res) {
        try {
            let attributeOptionSave = await AttributeOption.create(req.body);
            if (!_.isEmpty(attributeOptionSave) && attributeOptionSave._id) {
                res.status(200).send({ status: 200, data: attributeOptionSave, message: 'Attribute Option has been added successfully' });
            }
            else {
                res.status(400).send({ status: 400, message: 'Attribute Option not added' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** Attribute Wise Option List */
    async attributeOptionList(req, res) {
        try {
            const attributeId = new mongoose.Types.ObjectId(req.body.attribute_id);
            let attribute_options = await AttributeOption.find({ attribute_id: attributeId });
            if (!_.isEmpty(attribute_options)) {
                res.status(200).send({ status: 200, data: attribute_options, message: 'Attribute Options List fetched successfully' });
            }
            else {
                res.status(201).send({ status: 201, message: 'No Attribute Option Found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async attributeOptionUpdate(req, res) {
        try {
            const attribute_option_id = new mongoose.Types.ObjectId(req.params.id);
            let attributeOptionInfo = await AttributeOption.findOne({ _id: attribute_option_id });
            if (!_.isEmpty(attributeOptionInfo) && attributeOptionInfo._id) {
                let attributeOptionUpdate = await attributeoptionRepo.updateById(req.body, attribute_option_id);
                if (!_.isEmpty(attributeOptionUpdate) && attributeOptionUpdate._id) {
                    res.status(200).send({ status: 200, data: attributeOptionUpdate, message: 'Attribute Option updated successfully' });
                }
                else {
                    res.status(400).send({ status: 400, message: 'Attribute Option could not be updated' });
                }
            } else {
                res.status(400).send({ status: 400, message: 'Attribute Option not found' });
            }            
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** User side Attribute Options List */
    async userAttributeOptionList(req, res) {
        try {
            const attributeId = new mongoose.Types.ObjectId(req.body.attribute_id);
            let attribute_options = await AttributeOption.find({ attribute_id: attributeId });
            if (!_.isEmpty(attribute_options)) {
                res.status(200).send({ status: 200, data: attribute_options, message: 'Attribute Options List fetched successfully' });
            }
            else {
                res.status(400).send({ status: 400, message: 'Attribute Option not found' });
            }
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    };


}

module.exports = new attributeOptionController();