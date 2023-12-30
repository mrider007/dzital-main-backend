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
            res.send({ status: 500, message: e.message });
        }
    };

}

module.exports = new productFashionController();