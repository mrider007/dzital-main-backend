const Connection = require('../models/connection.model');

const connectionRepository = {

    updateById: async (data, id) => {
        try {
            let connectionrequestUpdate = await Connection.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!connectionrequestUpdate) {
                return null;
            }
            return connectionrequestUpdate;
        } catch (e) {
            throw e;
        }
    },

    getConnectionRequests: async (req) => {
        try {

        } catch (e) {
            throw e;
        }
    }

}

module.exports = connectionRepository;