const mongoose = require('mongoose');
const Job = require('../models/product_jobs.model');
const Review = require('../models/review.model');
const reviewRepo = require('../repositories/review.repository');

class ReviewController {
    constructor() { }

    async reviewJob(req, res) {
        try {
            req.body.userId = req.user._id;
            if (!_.has(req.body, 'jobId')) {
                res.send({ status: 201, message: 'Job Id is required' });
            }
            else if (!_.has(req.body, 'review')) {
                res.send({ status: 201, message: 'Review is required' });
            }
            else if (!_.has(req.body, 'rating')) {
                res.send({ status: 201, message: 'Rating is required' });
            }
            else {
                let review = await Review.create(req.body);
                if (!_.isEmpty(review) && review._id) {
                    res.status(200).send({ status: 200, data: review, message: 'Review has been saved' });
                } else {
                    res.status(400).send({ status: 400, message: 'Review could not be saved' });
                }
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async jobReviewList(req, res) {
        try {
            let JobId = new mongoose.Types.ObjectId(req.body.jobId);
            let JobInfo = await Job.findOne({ _id: JobId });
            if (!_.isEmpty(JobInfo) && JobInfo._id) {
                let reviews = await Review.find({ jobId: JobId });
                if (!_.isEmpty(reviews)) {
                    res.status(200).send({ status: 200, data: reviews, message: 'Job reviews fetched successfully' });
                } else {
                    res.status(201).send({ status: 201, data: [], message: 'No reviews found' });
                }
            } else {
                res.status(201).send({ status: 201, message: 'Job not found!' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async reviewDetails(req, res) {
        try {
            let review_id = new mongoose.Types.ObjectId(req.params.id);
            let reviewInfo = await Review.findOne({ _id: review_id });
            if (!_.isEmpty(reviewInfo) && reviewInfo._id) {
                res.status(200).send({ status: 200, data: reviewInfo, message: 'Review details fetched successfully' });
            } else {
                res.status(201).send({ status: 201, data: {}, message: 'Review not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async reviewUpdate(req, res) {
        try {
            let review_id = new mongoose.Types.ObjectId(req.params.id);
            let reviewInfo = await Review.findOne({ _id: review_id });
            if (!_.isEmpty(reviewInfo) && reviewInfo._id) {
                let reviewUpdate = await reviewRepo.updateById(req.body, review_id);
                if (!_.isEmpty(reviewUpdate) && reviewUpdate._id) {
                    res.status(200).send({ status: 200, data: reviewUpdate, message: 'Review has been updated' });
                } else {
                    res.status(201).send({ status: 201, message: 'Review could not be updated' });
                }
            } else {
                res.status(201).send({ status: 201, data: {}, message: 'Review not found!' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async reviewDelete(req, res) {
        try {
            let review_id = new mongoose.Types.ObjectId(req.params.id);
            let reviewInfo = await Review.findOne({ _id: review_id });
            if (!_.isEmpty(reviewInfo) && reviewInfo._id) {
                let reviewDelete = await reviewRepo.delete(review_id);
                if (!_.isEmpty(reviewDelete) && reviewDelete._id) {
                    res.status(200).send({ status: 200, data: reviewInfo, message: 'Review has been removed' });
                }
                else {
                    res.status(201).send({ status: 201, data: {}, message: 'Review could not be removed' });
                }
            } else {
                res.status(201).send({ status: 201, data: {}, message: 'Review could not be removed' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

}

module.exports = new ReviewController();