const mongoose = require('mongoose');
const AttributeValue = require('../models/attribute_value.model');

class attributevalueController {
    constructor() { }

    /** User Product Attribute Value Add */
    async productattributeValueAdd(req, res) {
        try {
            let attributeValueSave = await AttributeValue.create(req.body);
            if (!_.isEmpty(attributeValueSave)) {
                res.send({ status: 200, data: attributeValueSave, message: 'Product Attribute Value saved successfully' });
            }
            else {
                res.send({ status: 400, message: 'Product Attribute Value not saved' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

}

module.exports = new attributevalueController();