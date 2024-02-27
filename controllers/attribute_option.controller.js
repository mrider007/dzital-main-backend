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

}

module.exports = new attributeOptionController();