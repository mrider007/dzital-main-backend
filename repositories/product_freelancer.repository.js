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
    }

}

module.exports = freelancerRepository;