const mongoose = require('mongoose');
const Currency = require('../models/currency.model');
const currencyRepo = require('../repositories/currency.repository');

class currencyController {
    constructor() { }

    async add(req, res) {
        try {
            const currencyCheck = await Currency.findOne({ currency_name: req.body.currency_name });
            if (!_.isEmpty(currencyCheck) && currencyCheck._id) {
                res.status(400).send({ status: 400, data: {}, message: 'Currency already exists' });
            }
            else {
                let saveData = await Currency.create(req.body);
                if (!_.isEmpty(saveData) && saveData._id) {
                    res.status(200).send({ status: 200, data: saveData, message: 'Currency added successfully' });
                }
                else {
                    res.status(400).send({ status: 400, data: {}, message: 'Currency could not be added' });
                }
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async list(req, res) {
        try {
            const currencyList = await currencyRepo.list(req);
            if (!_.isEmpty(currencyList)) {
                res.status(200).send({ status: 200, data: currencyList.docs, total: currencyList.total, limit: currencyList.limit, page: currencyList.page, pages: currencyList.pages, message: 'Currency list has been fetched successfully' });
            }
            else {
                res.status(400).send({ status: 400, data: [], message: 'No records found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async details(req, res) {
        try {
            const currency_id = new mongoose.Types.ObjectId(req.params.id);
            const currencyInfo = await Currency.findOne({ _id: currency_id });
            if (!_.isEmpty(currencyInfo) && currencyInfo._id) {
                res.status(200).send({ status: 200, data: currencyInfo, message: 'Currency details has been fetched successfully' });
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'Currency not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async update(req, res) {
        try {
            const currency_id = new mongoose.Types.ObjectId(req.params.id);
            let currencyInfo = await Currency.findOne({ _id: currency_id });
            if (!_.isEmpty(currencyInfo) && currencyInfo._id) {
                let currencyUpdate = await currencyRepo.updateById(req.body, currency_id);
                if (!_.isEmpty(currencyUpdate) && currencyUpdate._id) {
                    res.status(200).send({ status: 200, data: currencyUpdate, message: 'Currency details has been updated successfully' });
                }
                else {
                    res.status(400).send({ status: 400, data: {}, message: 'Currency could not be updated' });
                }
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'Currency not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async delete(req, res) {
        try {
            const currency_id = new mongoose.Types.ObjectId(req.params.id);
            let currencyInfo = await Currency.findOne({ _id: currency_id });
            if (!_.isEmpty(currencyInfo) && currencyInfo._id) {
                let currencyDelete = await currencyRepo.delete(currency_id);
                if (!_.isEmpty(currencyDelete) && currencyDelete._id) {
                    res.status(200).send({ status: 200, data: currencyDelete, message: 'Currency has been removed successfully' });
                }
                else {
                    res.status(400).send({ status: 400, data: {}, message: 'Sorry, unable to remove currency at this moment' });
                }
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'Currency not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

}

module.exports = new currencyController();