const Country = require('../models/country.model');

class countryController {
    constructor() { }

    async add(req, res) {
        try {
            const countryCheck = await Country.findOne({ name: req.body.name });
            if (!_.isEmpty(countryCheck) && countryCheck._id) {
                res.send({ status: 400, data: countryCheck, message: 'Country already exists' });                
            }            
            else {
                let saveData = await Country.create(req.body);
                if (!_.isEmpty(saveData) && saveData._id) {
                    res.send({ status: 200, data: saveData, message: 'Country added successfully' });
                }
                else {
                    res.send({ status: 400, data: {}, message: 'Country could not be added' });
                }
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

}

module.exports = new countryController();