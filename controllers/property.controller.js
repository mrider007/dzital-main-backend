const Property = require('../models/property.model');

class propertyController {
    constructor() { }

    async add(req, res) {
        try {
            req.body.added_by = req.user._id;
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
}

module.exports = new propertyController();