const mongoose = require('mongoose');
const Currency = require('../models/currency.model');
const currencyRepo = require('../repositories/currency.repository');

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

    async list(req, res) {
        try {
            const currencyList = await currencyRepo.list(req);
            if (!_.isEmpty(currencyList)) {
                res.send({ status: 200, data: currencyList.docs, total: currencyList.total, limit: currencyList.limit, page: currencyList.page, pages: currencyList.pages, message: 'Currency list has been fetched successfully' });
            }
            else {
                res.send({ status: 400, data: [], message: 'No records found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async details(req, res) {
        try {
            const currency_id = new mongoose.Types.ObjectId(req.params.id);
            const currencyInfo = await Currency.findOne({ _id: currency_id });
            if (!_.isEmpty(currencyInfo) && currencyInfo._id) {
                res.send({ status: 200, data: currencyInfo, message: 'Currency details has been fetched successfully' });
            }
            else {
                res.send({ status: 400, data: {}, message: 'Currency not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

}

module.exports = new currencyController();