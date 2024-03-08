const mongoose = require('mongoose');
const AttributeValue = require('../models/attribute_value.model');

const attributevalueRepository = {

    updateByField: async (field, data) => {
        try {
            let update = await AttributeValue.findOneAndUpdate(field, data, { upsert: true, 'new': true });
            if (!update) {
                return null;
            }
            return update;
        } catch (err) {
            throw err;
        }
    }

}

module.exports = attributevalueRepository;