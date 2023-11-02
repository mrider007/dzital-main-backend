const Service = require('../models/service_master.model');

const serviceRepository = {

    updateById: async (data, id) => {
        try {
            let serviceUpdate = await Service.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!serviceUpdate) {
                return null;
            }
            return serviceUpdate;
        } catch (e) {
            throw e;
        }
    },

    delete: async (id) => {
        try {
            let service = await Service.findById(id);
            if (service) {
                let serviceDelete = await Service.deleteOne({ _id: id }).exec();
                if (!serviceDelete) {
                    return null;
                }
                return service;
            }
        } catch (e) {
            throw e;
        }
    }

}

module.exports = serviceRepository;