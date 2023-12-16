const ProductGoods = require('../models/product_goods.model');

const productRepository = {

    updateById: async (data, id) => {
        try {
            let productGoodsUpdate = await ProductGoods.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!productGoodsUpdate) {
                return null;
            }
            return productGoodsUpdate;
        } catch (e) {
            return e;
        }
    }
}

module.exports = productRepository;