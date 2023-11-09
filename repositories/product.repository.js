const Product = require('../models/product.model');

const productRepository = {

    productList: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({});

            if (_.isObject(req.body) && _.has(req.body, 'name')) {
                and_clauses.push({ $or: [{ "name": { $regex: (req.body.name).trim(), $options: 'i' } }] });
            }

            conditions['$and'] = and_clauses;

            let products = Product.aggregate([
                { $match: conditions }
            ]);
            if (!products) {
                return null;
            }
            var options = { page: req.body.page, limit: req.body.limit };
            let allProducts = await Product.aggregatePaginate(products, options);
            return allProducts;
        } catch (e) {
            throw e;
        }
    },

    updateById: async (data, id) => {
        try {
            let productUpdate = await Product.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!productUpdate) {
                return null;
            }
            return productUpdate;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = productRepository;