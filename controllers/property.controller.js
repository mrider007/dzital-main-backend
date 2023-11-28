const Property = require('../models/property.model');

class propertyController {
    constructor() { }

    async add(req, res) {
        try {

        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };
}

module.exports = new propertyController();