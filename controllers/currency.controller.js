const mongoose = require('mongoose');
const Currency = require('../models/currency.model');

class currencyController {
    constructor() { }

    async add(req, res) {
        try {
            const currencyCheck = await Currency.findOne({ currency_name: req.body.currency_name });
            if (!_.isEmpty(currencyCheck) && currencyCheck._id) {
                res.send({ status: 400, data: {}, message: 'Currency already exists' });
            }
            else {
                let saveData = await Currency.create(req.body);
                if (!_.isEmpty(saveData) && saveData._id) {
                    res.send({ status: 200, data: saveData, message: 'Currency added successfully' });
                }
                else {
                    res.send({ status: 400, data: {}, message: 'Currency could not be added' });
                }
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

}

module.exports = new currencyController();