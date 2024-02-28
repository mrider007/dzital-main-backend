const AttributeOption = require('../models/attribute_option.model');
const mongoose = require('mongoose');

const attributeoptionRepository = {

    updateById: async (data, id) => {
        try {
            let attributeoptionUpdate = await AttributeOption.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!attributeoptionUpdate) {
                return null;
            }
            return attributeoptionUpdate;
        } catch (e) {
            throw e;
        }
    },

}

module.exports = attributeoptionRepository;