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
                { $match: conditions },
                {
                    $group: {
                        _id: '$_id',
                        name: { $first: '$name' },
                        description: { $first: '$description' },
                        price: { $first: '$price' },
                        product_type: { $first: '$product_type' },
                        photo: { $first: '$photo' },
                        image_1: { $first: '$image_1' },
                        image_2: { $first: '$image_2' },
                        image_3: { $first: '$image_3' },
                        brand: { $first: '$brand' },
                        category_id: { $first: '$category_id' },
                        quantity: { $first: '$quantity' },
                    }
                }
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
    },

    delete: async (id) => {
        try {
            let product = await Product.findById(id);
            if (product) {
                let productDelete = await Product.deleteOne({ _id: id }).exec();
                if (!productDelete) {
                    return null;
                }
                return product;
            }
        } catch (e) {
            throw e;
        }
    }

}

module.exports = productRepository;