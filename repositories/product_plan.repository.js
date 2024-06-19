const ProductPlan = require("../models/product_plan.model");

const ProductPlanRepository = {

    updateById: async (field, data) => {
        try {
            const saveData = await ProductPlan.findOneAndUpdate(field, data, { $new: true, $upsert: true }).exec();
            if (!saveData) {
                return null;
            } else {
                return saveData;
            }
        } catch (e) {
            throw e;
        }
    }
}

module.exports = ProductPlanRepository;