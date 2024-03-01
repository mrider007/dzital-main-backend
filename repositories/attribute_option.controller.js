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

    delete: async (id) => {
        try {
            let attribute_option = await AttributeOption.findById(id);
            if (attribute_option) {
                let attributeoptionDelete = await AttributeOption.deleteOne({ _id: id }).exec();
                if (!attributeoptionDelete) {
                    return null;
                }
                return attribute_option;
            }
        } catch (e) {
            throw e;
        }
    }

}

module.exports = attributeoptionRepository;