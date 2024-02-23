const Attribute = require('../models/attribute.model');

const attributeRepository = {

    getAttributes: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({  });

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'attribute': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
                    ]
                });
            }

            conditions['$and'] = and_clauses;

            let attributes = Attribute.aggregate([
                {
                    $lookup: {
                        let: { category_id: '$_id' },
                        from: "service_categories",
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $or: [{ $eq: ["$parentId", "$$category_id"] }] },
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "sub_category_details"
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        title: { $first: '$title' },
                        parentId: { $first: '$parentId' },
                        total_sub_categories: { $first: '$total_sub_categories' },
                        createdAt: { $first: '$createdAt' },
                    }
                },
                { $match: conditions }
            ]);
            if (!attributes) {
                return null;
            }
            var options = { page: req.body.page, limit: req.body.limit };
            let allAttributes = await Attribute.aggregatePaginate(attributes, options);
            return allAttributes;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = attributeRepository;