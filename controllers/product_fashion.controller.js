const mongoose = require('mongoose');
const ProductFashion = require('../models/product_fashion.model');
const fashionRepo = require('../repositories/product_fashion.repository');
class productFashionController {
    constructor() { }

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

            const fashion = await fashionRepo.list(req);
            if (!_.isEmpty(fashion)) {
                res.status(200).send({ status: 200, data: fashion.docs, total: fashion.total, limit: fashion.limit, page: fashion.page, pages: fashion.pages, message: 'Fashion Products fetched successfully' });
            }
            else {
                res.status(201).send({ status: 201, data: [], message: 'No Products found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async details(req, res) {
        try {
            const fashion_id = new mongoose.Types.ObjectId(req.params.id);
            const FashionProduct = await fashionRepo.getDetails({ _id: fashion_id });
            if (!_.isEmpty(FashionProduct)) {
                res.status(200).send({ status: 200, data: FashionProduct, message: 'Fashion Product details fetched successfully' });
            }
            else {
                res.status(400).send({ status: 400, message: 'Product Not Found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async FashionProductsBulkUpdate(req, res) {
        try {
            let productsUpdate = await ProductFashion.updateMany({}, { $set: { 'sub_category_id': null } });
            res.status(200).send({ status: 200, data: productsUpdate, message: 'Fashion Products Updated Successfully' });
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

}

module.exports = new productFashionController();