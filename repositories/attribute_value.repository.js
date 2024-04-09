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
    },

    updateById: async (data, id) => {
        try {
            let attributeUpdate = await AttributeValue.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!attributeUpdate) {
                return null;
            }
            return attributeUpdate;
        } catch (e) {
            throw e;
        }
    },

    deleteMany: async (product_id) => {
        try {
            const data = await AttributeValue.deleteMany({ product_id })
            return data
        } catch (e) {
            throw e;
        }

    }

}

module.exports = attributevalueRepository;