const mongoose = require('mongoose');
const Country = require('../models/country.model');
const countryRepo = require('../repositories/country.repository');

class countryController {
    constructor() { }

    async add(req, res) {
        try {
            const countryCheck = await Country.findOne({ name: req.body.name });
            if (!_.isEmpty(countryCheck) && countryCheck._id) {
                res.status(400).send({ status: 400, data: countryCheck, message: 'Country already exists' });
            }
            else {
                let saveData = await Country.create(req.body);
                if (!_.isEmpty(saveData) && saveData._id) {
                    res.status(200).send({ status: 200, data: saveData, message: 'Country added successfully' });
                }
                else {
                    res.status(400).send({ status: 400, data: {}, message: 'Country could not be added' });
                }
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async details(req, res) {
        try {
            const country_id = new mongoose.Types.ObjectId(req.params.id);
            let countryInfo = await Country.findOne({ _id: country_id });
            if (!_.isEmpty(countryInfo) && countryInfo._id) {
                res.status(200).send({ status: 200, data: countryInfo, message: 'Country details has been fetched successfully' });
            } else {
                res.status(400).send({ status: 400, data: {}, message: 'Country not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async list(req, res) {
        try {
            if (!req.body.page) {
                req.body.page = 1;
            }
            else {
                req.body.page = parseInt(req.body.page);
            }

            if (!req.body.limit) {
                req.body.limit = 10;
            }
            else {
                req.body.limit = parseInt(req.body.limit);
            }

            let countries = await countryRepo.list(req);
            if (!_.isEmpty(countries)) {
                res.status(200).send({ status: 200, data: countries.docs, total: countries.total, limit: countries.limit, page: countries.page, pages: countries.pages, message: 'Country list has been fetched successfully' });
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'No country found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async update(req, res) {
        try {
            const country_id = new mongoose.Types.ObjectId(req.params.id);
            let countryInfo = await Country.findOne({ _id: country_id });
            if (!_.isEmpty(countryInfo) && countryInfo._id) {
                let countryUpdate = await countryRepo.updateById(req.body, country_id);
                if (!_.isEmpty(countryUpdate) && countryUpdate._id) {
                    res.status(200).send({ status: 200, data: countryUpdate, message: 'Country has been updated successfully' });
                }
                else {
                    res.status(400).send({ status: 400, data: {}, message: 'Country could not be updated' });
                }
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'Country not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async delete(req, res) {
        try {
            const country_id = new mongoose.Types.ObjectId(req.params.id);
            let countryDetails = await Country.findOne({ _id: country_id });
            if (!_.isEmpty(countryDetails) && countryDetails._id) {
                let countryDelete = await countryRepo.delete(country_id);
                if (!_.isEmpty(countryDelete) && countryDelete._id) {
                    res.status(200).send({ status: 200, data: countryDelete, message: 'Country has been removed successfully' });
                }
                else {
                    res.status(400).send({ status: 400, message: 'Country could not be removed' });
                }
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'Country not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

}

module.exports = new countryController();