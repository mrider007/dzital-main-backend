const mongoose = require('mongoose');
//const Attribute = require('../models/attribute.model');
const Attribute = require('../models/attribute.model');

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

}

module.exports = new attributeController();