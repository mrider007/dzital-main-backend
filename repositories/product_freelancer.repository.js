const Freelancer = require('../models/product_freelancer.model');

const freelancerRepository = {

    getDetails: async (params) => {
        try {
            let products = await Freelancer.aggregate([
                { $match: params },
                {
                    $lookup: {
                        from: 'service_categories',
                        localField: 'category_id',
                        foreignField: '_id',
                        as: 'category_details'
                    }
                },
                { $unwind: { path: '$category_details', preserveNullAndEmptyArrays: true } }
            ]);
            if (!products) {
                return null;
            }
            return products[0];
        } catch (e) {
            throw e;
        }
    },

    list: async (req) => {
        try {
            var conditions = {};   
            var and_clauses = [];
            
            and_clauses.push({ });

            conditions['$and'] = and_clauses;

            let products = Freelancer.aggregate([
                {
                    $lookup: {
                        from: 'service_categories',
                        localField: 'category_id',
                        foreignField: '_id',
                        as: 'category_details'
                    }
                },
                { $unwind: { path: '$category_details', preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'product_id',
                        foreignField: '_id',
                        as: 'product_details'
                    }
                },
                { $unwind: { path: '$product_details', preserveNullAndEmptyArrays: true } },
                {
                    $group: {
                        _id: '$_id',
                        title: { $first: '$title' },
                        description: { $first: '$description' },
                        experience: { $first: '$experience' },
                        skills: { $first: '$skills' },
                        location: { $first: '$location' },
                        budget: { $first: '$budget' },
                        status: { $first: '$product_details.status' },
                        category_id: { $first: '$category_id' },
                        category_name: { $first: '$category_details.title' },
                        createdAt: { $first: '$createdAt' }
                    }                    
                },
                { $match: conditions },
                { $sort: { _id: -1 } }
            ]);

            if (!products) {
                return null;
            }
            var options = { page: req.body.page, limit: req.body.limit };
            let allProducts = await Freelancer.aggregatePaginate(products, options);
            return allProducts;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = freelancerRepository;