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

            if (_.isObject(req.body) && _.has(req.body, 'keyword_search')) {
                and_clauses.push({
                    $or: [
                        { 'title': { $regex: (req.body.keyword_search).trim(), $options: 'i' } }
                    ]
                });
            }

            conditions['$and'] = and_clauses;

            let plans = MembershipPlan.aggregate([
                { $match: conditions }
            ]);

            var options = { page: req.body.page, limit: req.body.limit };
            let allPlans = await MembershipPlan.aggregatePaginate(plans, options);
            return allPlans;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = MembershipPlanRepository;