const mongoose = require('mongoose');
const ProductGoods = require('../models/product_goods.model');
const goodsRepo = require('../repositories/product_goods.repository');

class productGoodsController {
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
                req.body.limit = 1;
            }
            else {
                req.body.limit = parseInt(req.body.limit);
            }

            const goods = await goodsRepo.List(req);
            if (!_.isEmpty(goods)) {
                res.status(200).send({ status: 200, data: goods.docs, total: goods.total, limit: goods.limit, page: goods.page, pages: goods.pages, message: 'Goods of all kinds Products fetched successfully' });
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
            const goods_id = new mongoose.Types.ObjectId(req.params.id);
            let goodsInfo = await goodsRepo.getDetails({ _id: goods_id });
            if (!_.isEmpty(goodsInfo) && goodsInfo._id) {
                res.send({ status: 200, data: goodsInfo, message: 'Product details has been fetched successfully' });
            }
            else {
                res.send({ status: 400, data: {}, message: 'Product not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };
    
}

module.exports = new productGoodsController();