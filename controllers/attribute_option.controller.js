const mongoose = require('mongoose');
const AttributeOption = require('../models/attribute_option.model');

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

}

module.exports = new attributeOptionController();