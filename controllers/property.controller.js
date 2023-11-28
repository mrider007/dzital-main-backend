const mongoose = require('mongoose');
const Property = require('../models/property.model');

class propertyController {
    constructor() { }

    async add(req, res) {
        try {
            let propertyCheck = await Property.create(req.body);
            if (!_.isEmpty(propertyCheck) && propertyCheck._id) {
                res.send({ status: 200, data: propertyCheck, message: 'Property has been added successfully' });
            }
            else {
                res.send({ status: 400, data: {}, message: 'Property could not be added' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async details(req, res) {
        try {
            const property_id = new mongoose.Types.ObjectId(req.params.id);
            const propertyInfo = await Property.findOne({ _id: property_id });
            if (!_.isEmpty(propertyInfo) && propertyInfo._id) {
                res.send({ status: 200, data: propertyInfo, message: 'Property details has been fetched successfully' });
            }
            else {
                res.send({ status: 400, data: {}, message: 'Property not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };
}

module.exports = new propertyController();