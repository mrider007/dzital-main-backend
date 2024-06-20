const Product = require("../models/product.model");
const subscription_user = require("../models/subscription_user.model");
const subscriptionUserRepo = require("../repositories/subscription_user.repository");
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
    };

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
    };

    async cancel_subscription(req, res) {
        try {
            const { id } = req.params
            const updatedSubscription = await subscriptionUserRepo.updateOne({ _id: id }, { status: 'Inactive' })
            if (!_.isEmpty(updatedSubscription) && updatedSubscription._id) {
                if (updatedSubscription.purchase_mode === 'Subscription') {
                    await stripe.subscriptions.update(updatedSubscription?.payment_id, {
                        pause_collection: {
                            behavior: 'mark_uncollectible',
                        },
                    });
                }
                res.status(200).send({ status: 200, data: updatedSubscription, message: 'Subscription has been cancelled successfully' });
            } else {
                res.status(400).send({ status: 400, message: 'Subscription could not be cancelled' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async resume_subscription(req, res) {
        try {
            const { id } = req.params;
            const updatedSubscription = await subscriptionUserRepo.updateOne({ _id: id }, { status: 'Active' });
            if (!_.isEmpty(updatedSubscription) && updatedSubscription._id) {
                if (updatedSubscription.purchase_mode === 'Subscription') {
                    await stripe.subscriptions.update(updatedSubscription?.payment_id, {
                        pause_collection: ''
                    });
                }
                res.status(200).send({ status: 200, data: updatedSubscription, message: 'Subscription has been resumed successfully' });
            } else {
                res.status(400).send({ status: 400, message: 'Subscription could not be resumed' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message })
        }
    }

}

module.exports = new SubscriptionUserController()