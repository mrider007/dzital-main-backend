const mongoose = require('mongoose');
const Product = require('../models/product.model');
const Review = require('../models/review.model');
const reviewRepo = require('../repositories/review.repository');

class ReviewController {
    constructor() { }

    /** User Product Review Save */
    async productReviewAdd(req, res) {
        try {
            req.body.userId = req.user._id;
            if (!_.has(req.body, 'productId')) {
                res.send({ status: 201, message: 'Product Id is Required' });
            }
            else if (!_.has(req.body, 'review')) {
                res.send({ status: 201, message: 'Review is Required' });
            }
            else if (!_.has(req.body, 'rating')) {
                res.send({ status: 201, message: 'Rating is Required' });
            }
            else {
                let review = await Review.create(req.body);
                if (!_.isEmpty(review) && review._id) {
                    res.status(200).send({ status: 200, data: review, message: 'Product Review Saved Successfully' });
                } else {
                    res.status(400).send({ status: 400, message: 'Product Review could not be saved' });
                }
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** Product Reviews List */
    async productReviewList(req, res) {
        try {
            const productId = new mongoose.Types.ObjectId(req.body.productId);
            let productReviews = await Review.find({ _id: productId });
            if (!_.isEmpty(productReviews)) {
                res.status(200).send({ status: 200, data: productReviews, message: 'Product Reviews List Fetched Successfully' });
            } else {
                res.status(400).send({ status: 400, message: 'Product Not Found!' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async reviewDetails(req, res) {
        try {
            let review_id = new mongoose.Types.ObjectId(req.params.id);
            let reviewInfo = await Review.findOne({ _id: review_id });
            if (!_.isEmpty(reviewInfo) && reviewInfo._id) {
                res.status(200).send({ status: 200, data: reviewInfo, message: 'Review Details Fetched Successfully' });
            } else {
                res.status(201).send({ status: 201, data: {}, message: 'Review Not Found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async reviewUpdate(req, res) {
        try {
            let review_id = new mongoose.Types.ObjectId(req.params.id);
            let reviewInfo = await Review.findOne({ _id: review_id });
            if (!_.isEmpty(reviewInfo) && reviewInfo._id) {
                let reviewUpdate = await reviewRepo.updateById(req.body, review_id);
                if (!_.isEmpty(reviewUpdate) && reviewUpdate._id) {
                    res.status(200).send({ status: 200, data: reviewUpdate, message: 'Review Updated Successfully' });
                } else {
                    res.status(201).send({ status: 201, message: 'Review could not be updated' });
                }
            } else {
                res.status(201).send({ status: 201, data: {}, message: 'Review Not Found!' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async reviewDelete(req, res) {
        try {
            let review_id = new mongoose.Types.ObjectId(req.params.id);
            let reviewInfo = await Review.findOne({ _id: review_id });
            if (!_.isEmpty(reviewInfo) && reviewInfo._id) {
                let reviewDelete = await reviewRepo.delete(review_id);
                if (!_.isEmpty(reviewDelete) && reviewDelete._id) {
                    res.status(200).send({ status: 200, data: reviewInfo, message: 'Review Removed Successfully' });
                }
                else {
                    res.status(201).send({ status: 201, data: {}, message: 'Review could not be removed' });
                }
            } else {
                res.status(201).send({ status: 201, data: {}, message: 'Review Not Found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

}

module.exports = new ReviewController();