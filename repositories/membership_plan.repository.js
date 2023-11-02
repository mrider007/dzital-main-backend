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
    }

}

module.exports = MembershipPlanRepository;