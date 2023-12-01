const MembershipPlan = require('../models/membership_plan.model');

const MembershipPlanRepository = {

    updateById: async (data, id) => {
        try {
            let planUpdate = await MembershipPlan.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!planUpdate) {
                return null;
            }
            return planUpdate;
        } catch (e) {
            throw e;
        }
    },

    delete: async (id) => {
        try {
            let plan = await MembershipPlan.findById(id);
            if (plan) {
                let planDelete = await MembershipPlan.deleteOne({ _id: id }).exec();
                if (!planDelete) {
                    return null;
                }
                return plan;
            }
        } catch (e) {
            throw e;
        }
    },

    planList: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({});

            let key = req.body.keyword_search;

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'title': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
                    ]
                });

                // Check if keyword_search has length greater than 0
                if (key.length > 0) {
                    // Disable req.body.page and req.body.limit
                    req.body.page = undefined;
                    req.body.limit = undefined;
                }
            }

            conditions['$and'] = and_clauses;

            let plans = MembershipPlan.aggregate([
                { $match: conditions },
                { $sort: { _id: -1 } }
            ]);

            // Only set options if they are not disabled
            var options = {};
            if (req.body.page !== undefined) {
                options.page = req.body.page;
            }
            if (req.body.limit !== undefined) {
                options.limit = req.body.limit;
            }

            let allPlans = await MembershipPlan.aggregatePaginate(plans, options);
            return allPlans;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = MembershipPlanRepository;