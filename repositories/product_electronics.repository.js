const ProductElectronics = require('../models/product_electronics.model');

const productElectronicsRepository = {
    
    updateById: async (data, id) => {
        try {
            let electronicsUpdate = await ProductElectronics.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!electronicsUpdate) {
                return null;
            }
            return electronicsUpdate;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = productElectronicsRepository;