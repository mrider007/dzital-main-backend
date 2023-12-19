const mongoose = require('mongoose');
const ProductElectronics = require('../models/product_electronics.model');
const electronicsRepo = require('../repositories/product_electronics.repository');

class ProductElectronicsController {
    constructor() { }

    async list(req, res) {
        try {
            if (!req.body.page) {
                req.body.page = 1;
            } else {
                req.body.page = parseInt(req.body.page);
            }

            if (!req.body.limit) {
                req.body.limit = 10;
            } else {
                req.body.limit = parseInt(req.body.limit);
            }
            const electronics = await electronicsRepo.List(req);
            if (!_.isEmpty(electronics)) {
                res.status(200).send({ status: 200, data: electronics.docs, total: electronics.total, limit: electronics.limit, page: electronics.page, pages: electronics.pages, message: 'Electronic Products fetched successfully' });
            }
            else {
                res.status(201).send({ status: 201, data: [], message: 'No Products found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async details(req, res) {
        try {
            const electronic_id = new mongoose.Types.ObjectId(req.params.id);
            let electronicsInfo = await ProductElectronics.findOne({ _id: electronic_id });
            if (!_.isEmpty(electronicsInfo) && electronicsInfo._id) {
                res.status(200).send({ status: 200, data: electronicsInfo, message: 'Electronic product details has been fetched successfully' });
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

}

module.exports = new ProductElectronicsController();