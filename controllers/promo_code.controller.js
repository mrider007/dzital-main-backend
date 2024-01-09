const mongoose = require('mongoose');
const Promocode = require('../models/promo_code.model');
const promocodeRepo = require('../repositories/promo_code.repository');

class promocodeController {
    constructor() { }

    async add(req, res) {
        try {
            const saveData = await Promocode.create(req.body);
            if (!_.isEmpty(saveData) && saveData._id) {
                res.status(200).send({ status: 200, data: saveData, message: 'Promocode has been added successfully' });
            }
            else {
                res.status(400).send({ status: 400, message: 'Promocode could not be added' });
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
                req.body.limit = 10
            }
            else {
                req.body.limit = parseInt(req.body.limit);
            }

            const promocodes = await promocodeRepo.list(req);
            if (!_.isEmpty(promocodes)) {
                res.status(200).send({ status: 200, data: promocodes.docs, total: promocodes.total, limit: promocodes.limit, page: promocodes.page, pages: promocodes.pages, message: 'Promocode list has been fetched successfully' });
            } 
            else {
                res.status(201).send({ status: 201, data: [], message: 'No promocode found' });
            }           
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

}

module.exports = new promocodeController();