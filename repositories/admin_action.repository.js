const Action = require('../models/admin_action.model');

const actionRepository = {

    updateById: async (data, id) => {
        try {
            let actionsUpdate = await Action.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!actionsUpdate) {
                return null;
            }
            return actionsUpdate;            
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    }

}

module.exports = actionRepository;