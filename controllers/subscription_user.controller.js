const Product = require("../models/product.model");
const product_plan = require("../models/product_plan.model");
const subscription_user = require("../models/subscription_user.model");
const subscriptionUserRepo = require("../repositories/subscription_user.repository");
const time_calculation = require("../services/time-calculation");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class SubscriptionUserController {

    constructor() { }

    async create_free(req, res) {
        try {
            const product_data = await Product.findById(req.body.product_id)

            if (!product_data || !product_data._id) {
                return res.status(404).send({ status: 404, message: 'Product not found' });
            }

            if (product_data.purchase_mode !== 'Free') {
                return res.status(400).send({ status: 400, message: 'This product does not support free subscription' });
            }

            req.body.purchase_mode = product_data.purchase_mode
            req.body.user_id = req.user._id
            req.body.status = 'Active'
            req.body.amount = 0

            let userSubscriptionInfo = await subscription_user.create(req.body);
            if (!_.isEmpty(userSubscriptionInfo) && userSubscriptionInfo._id) {
                res.status(200).send({ status: 200, data: userSubscriptionInfo, message: 'User Subscription Created Successfully' });
            }
            else {
                res.status(400).send({ status: 400, message: 'Subscription user can not be created' });
            }

        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    }

    async getAllSubsription(req, res) {
        try {
            let userSubscriptionInfo = await subscriptionUserRepo.list(req);
            if (!_.isEmpty(userSubscriptionInfo)) {
                res.status(200).send({ status: 200, data: userSubscriptionInfo, message: 'User Subscription fetched Successfully' });
            }
            else {
                res.status(201).send({ status: 201, message: 'You Have No Subscription' });
            }
        } catch (error) {
            res.status(500).send({ status: 500, message: error.message });
        }
    }

    async pause_subscription(req, res) {
        try {
            const { id } = req.params
            const updatedSubscription = await subscriptionUserRepo.updateOne({ _id: id }, { status: 'Inactive' })
            if (!_.isEmpty(updatedSubscription) && updatedSubscription._id) {
                if (updatedSubscription.purchase_mode === 'Subscription') {
                    await stripe.subscriptions.update(updatedSubscription?.payment_id, {
                        pause_collection: {
                            behavior: 'mark_uncollectible',
                        },
                        cancel_at: null
                    });
                }
                res.status(200).send({ status: 200, data: updatedSubscription, message: 'Subscription has been cancelled successfully' });
            } else {
                res.status(400).send({ status: 400, message: 'Subscription could not be cancelled', data: {} });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    }

    async cancel_subscription(req, res) {
        try {
            const { id } = req.params
            const subscription = await subscriptionUserRepo.updateOne({ _id: id }, {
                status: 'Inactive',
                isEnded: true
            })
            if (_.isEmpty(subscription) || !subscription._id) {
                res.status(400).send({ status: 400, message: 'Subscription could not be cancelled', data: {} });
            } else {
                if(subscription.purchase_mode === 'Subscription'){
                    await stripe.subscriptions.cancel(
                        subscription?.payment_id
                    );
                }
                res.status(200).send({ status: 200, data: subscription, message: 'Subscription has been cancelled successfully' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    }

    async resume_subscription(req, res) {
        try {
            const { id } = req.params;
            const updatedSubscription = await subscriptionUserRepo.updateOne({ _id: id }, { status: 'Active' })
            if (!_.isEmpty(updatedSubscription) && updatedSubscription._id) {
                const plan_detail = await product_plan.findOne({ product_id: updatedSubscription.product_id })
                const newCancelAt = time_calculation.cancel_at(updatedSubscription.createdAt, updatedSubscription.current_plan_start, plan_detail.plan_interval, plan_detail.plan_interval_count)
                if (updatedSubscription.purchase_mode === 'Subscription') {
                    await stripe.subscriptions.update(updatedSubscription?.payment_id, {
                        pause_collection: '',
                        cancel_at: newCancelAt
                    });
                }
                res.status(200).send({ status: 200, data: updatedSubscription, message: 'Subscription has been resumed successfully' });
            } else {
                res.status(400).send({ status: 400, message: 'Subscription could not be resumed', data: {} });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message })
        }
    }

    async getSubscriptionDetails(req, res) {
        try {
            const { id } = req.params;
            const userSubscriptionInfo = await subscriptionUserRepo.getDetails(id, req.user._id)
            if (!_.isEmpty(userSubscriptionInfo) && userSubscriptionInfo._id) {
                res.status(200).send({ status: 200, data: userSubscriptionInfo, message: 'User Subscription fetched Successfully' });
            }
            else {
                res.status(201).send({ status: 201, message: 'You Have No Subscription' });
            }
        } catch (error) {
            res.status(500).send({ status: 500, message: error.message });
        }
    }

}

module.exports = new SubscriptionUserController()