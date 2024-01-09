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

    async details(req, res) {
        try {
            const promocode_id = new mongoose.Types.ObjectId(req.params.id);
            let PromocodeInfo = await Promocode.findOne({ _id: promocode_id });
            if (!_.isEmpty(PromocodeInfo) && PromocodeInfo._id) {
                res.status(200).send({ status: 200, data: PromocodeInfo, message: 'Promocode details has been fetched successfully' });
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'Promocode not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async update(req, res) {
        try {
            const promocode_id = new mongoose.Types.ObjectId(req.params.id);
            let PromocodeInfo = await Promocode.findOne({ _id: promocode_id });
            if (!_.isEmpty(PromocodeInfo) && PromocodeInfo._id) {
                let updateData = await promocodeRepo.updateById(req.body, promocode_id);
                if (!_.isEmpty(updateData) && updateData._id) {
                    res.status(200).send({ status: 200, data: updateData, message: 'Promocode has been updated successfully' });
                }
                else {
                    res.status(400).send({ status: 400, data: {}, message: 'Promocode could not be updated' });
                }
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'Promocode not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

}

module.exports = new promocodeController();