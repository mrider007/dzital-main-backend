const mongoose = require('mongoose');
const planRepo = require('../repositories/membership_plan.repository');
const MembershipPlan = require('../models/membership_plan.model');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class MembershipPlanController {
    constructor() { }

    async createPlan(req, res) {
        try {
            let planInfo = await MembershipPlan.findOne({ title: req.body.title });
            if (!_.isEmpty(planInfo) && planInfo._id) {
                res.status(400).send({ status: 400, data: {}, message: 'Plan already exists' });
            }
            else {
                const price = await stripe.prices.create({
                    currency: 'usd',
                    unit_amount: Number(req.body.amount) * 100,
                    recurring: {
                        interval: 'month',
                        interval_count: 1,
                    },
                    product_data: {
                        name: req.body.title,
                    },
                });
                if(_.isEmpty(price) || !price.id) {
                    return res.status(400).send({ status: 400, message: 'Plan can not be created' });
                }
                req.body.stripe_price_id = price.id;
                let planSave = await MembershipPlan.create(req.body);
                if (!_.isEmpty(planSave) && planSave._id) {
                    res.status(200).send({ status: 200, data: planSave, message: 'Membership Plan added successfully' });
                } else {
                    res.status(400).send({ status: 400, data: {}, message: 'Sorry, unable to add membership plan at this moment!' });
                }
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** Admin Plan List */
    async planList(req, res) {
        try {
            if (!req.body.page) {
                req.body.page = 1;
            }
            else {
                req.body.page = parseInt(req.body.page);
            }

            if (!req.body.limit) {
                req.body.limit = 10;
            }
            else {
                req.body.limit = parseInt(req.body.limit);
            }
            let planList = await planRepo.planList(req);
            if (!_.isEmpty(planList)) {
                res.status(200).send({ status: 200, data: planList.docs, total: planList.total, limit: planList.limit, page: planList.page, pages: planList.pages, message: 'Membership Plan list fetched successfully' });
            } else {
                res.status(201).send({ status: 201, data: [], message: 'No Membership Plan found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** User Plan List */
    async userPlanList(req, res) {
        try {
            if (!req.body.page) {
                req.body.page = 1;
            }
            else {
                req.body.page = parseInt(req.body.page);
            }

            if (!req.body.limit) {
                req.body.limit = 10;
            }
            else {
                req.body.limit = parseInt(req.body.limit);
            }
            let plans = await planRepo.planList(req);
            if (!_.isEmpty(plans)) {
                res.status(200).send({ status: 200, data: plans.docs, total: plans.total, limit: plans.limit, page: plans.page, pages: plans.pages, message: 'Membership Plan list fetched successfully' });
            } else {
                res.status(400).send({ status: 400, data: [], message: 'No Membership Plan Found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async planDetails(req, res) {
        try {
            let plan_id = new mongoose.Types.ObjectId(req.params.id);
            let planInfo = await MembershipPlan.findOne({ _id: plan_id });
            if (!_.isEmpty(planInfo) && planInfo._id) {
                res.status(200).send({ status: 200, data: planInfo, message: 'Membership Plan details fetched successfully' });
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'Membership Plan not found!' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async planUpdate(req, res) {
        try {
            let plan_id = new mongoose.Types.ObjectId(req.params.id);
            let planInfo = await MembershipPlan.findOne({ _id: plan_id });
            if (!_.isEmpty(planInfo) && planInfo._id) {
                let planUpdate = await planRepo.updateById(req.body, plan_id);
                if (!_.isEmpty(planUpdate) && planUpdate._id) {
                    res.status(200).send({ status: 200, data: planUpdate, message: 'Membership Plan has been updated' });
                } else {
                    res.status(400).send({ status: 400, data: {}, message: 'Membership Plan could not be updated' });
                }
            } else {
                res.status(400).send({ status: 400, data: {}, message: 'Membership Plan not found!' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async planDelete(req, res) {
        try {
            let plan_id = new mongoose.Types.ObjectId(req.params.id);
            let planInfo = await MembershipPlan.findOne({ _id: plan_id });
            if (!_.isEmpty(planInfo) && planInfo._id) {
                let planDelete = await planRepo.delete(plan_id);
                if (!_.isEmpty(planDelete) && planDelete._id) {
                    res.status(200).send({ status: 200, data: planDelete, message: 'Membership Plan removed successfully' });
                }
                else {
                    res.status(400).send({ status: 400, data: {}, message: 'Membership Plan could not be removed' });
                }
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };
}

module.exports = new MembershipPlanController();