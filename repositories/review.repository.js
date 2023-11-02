const Review = require('../models/review.model');

const reviewController = {

    updateById: async (data, id) => {
        try {
            let reviewUpdate = await Review.findByIdAndUpdate(id, data, { new: true, upsert: true }).exec();
            if (!reviewUpdate) {
                return null;
            }
            return reviewUpdate;
        } catch (e) {
            throw e;
        }
    },

    delete: async (id) => {
        try {
            let review = await Review.findById(id);
            if (review) {
                let reviewDelete = await Review.deleteOne({ _id: id }).exec();
                if (!reviewDelete) {
                    return null;
                }
                return review;
            }
        } catch (e) {
            throw e;
        }
    }

}

module.exports = reviewController;