const Product_Plan = require('../models/product_plan.model');
const SubscriptionPayment = require('../models/subscription_history.model');
const Product = require('../models/product.model');
const Product_Payment = require('../models/product_payment.model');
const SubscriptionUser = require('../models/subscription_user.model');
const stripe_webhook = require('../services/stripe-webhook');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const redirect_url = 'https://www.dzital.com';

class StripePaymentController {

    constructor() { }

    async create_payment(req, res) {
        try {
            const { product_id, quantity, redirect } = req.body;
            const productInfo = await Product.findOne({ _id: product_id })

            if (!productInfo) {
                return res.status(404).send({ status: 404, message: 'Product not found' });
            }

            if (productInfo.purchase_mode !== 'Paid' || !productInfo.product_price || productInfo.product_price === 0) {
                return res.status(400).send({ status: 400, message: "Product does not support payment" })
            }

            const DOMAIN = redirect || redirect_url

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: productInfo.title,
                                description: productInfo.description,
                            },
                            unit_amount: productInfo.product_price * 100, // Amount in cents (e.g., $20.00)
                        },
                        quantity: quantity || 1,
                    },
                ],
                metadata: {
                    product_id: productInfo._id?.toString(),
                    category_id: productInfo.category_id?.toString(),
                },
                customer_email: req?.user?.email,
                success_url: `${DOMAIN}/#/stripe-response?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${DOMAIN}/#/stripe-response?session_id={CHECKOUT_SESSION_ID}`,
            });

            if (_.isEmpty(session) || !session.id) {
                res.status(400).send({ status: 400, data: {}, message: 'session can not be created' })
            } else {
                res.status(200).json({ status: 200, data: session.id, message: "checkout session created successfully" });
            }

        } catch (error) {
            res.status(500).send({ status: 500, message: error.message });
        }
    }

    async subscribe_payment(req, res) {
        const { plan_id, redirect } = req.body;
        try {
            const plan_details = await Product_Plan.findById(plan_id);
            if (!plan_details) {
                return res.status(404).send({ error: 'plan not found' });
            }

            const DOMAIN = redirect || redirect_url

            const subscription = await SubscriptionUser.findOne({ product_id: plan_details?.product_id, user_id: req.user?._id });

            if (subscription && subscription.status === 'Active') {
                return res.status(400).send({ status: 400, message: "You already have active subscription for this product" })
            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'subscription',
                line_items: [
                    {
                        price: plan_details.stripe_price_id,
                        quantity: 1,
                    },
                ],
                metadata: {
                    plan_id: plan_details?._id?.toString(),
                    product_id: plan_details?.product_id?.toString()
                },
                customer_email: req?.user?.email,
                success_url: `${DOMAIN}/#/stripe-response?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${DOMAIN}/#/stripe-response?session_id={CHECKOUT_SESSION_ID}`,
            });

            if (_.isEmpty(session) || !session.id) {
                res.status(400).send({ status: 400, data: {}, message: 'session can not be created' })
            } else {
                res.status(200).json({ status: 200, data: session.id, message: "checkout session created successfully" });
            }

        } catch (error) {
            res.status(500).send({ status: 500, message: error.message });
        }

    }

    async verify_payment(req, res) {
        try {
            const { id } = req.body;
            const session = await stripe.checkout.sessions.retrieve(id);
            if (session?.payment_status === 'paid' && session?.status === 'complete') {
                let subs_data = {
                    product_id: session?.metadata?.product_id,
                    user_id: req.user?._id,
                    payment_id: session.id,
                    purchase_mode: session?.mode === 'subscription' ? 'Subscription' : 'Paid',
                    amount: session?.amount_total / 100,
                    status: session?.payment_status === 'paid' ? 'Active' : 'Inactive'
                }
                if (session?.mode === 'subscription') {
                    const subsData = await stripe.subscriptions.retrieve(
                        session.subscription
                    );
                    subs_data.payment_id = subsData.id;
                    subs_data.current_plan_start = new Date(subsData?.current_period_start * 1000)
                    subs_data.current_plan_end = new Date(subsData?.current_period_end * 1000)
                    const newSubscription = await SubscriptionUser.create(subs_data)

                    const saveData = await SubscriptionPayment.create({
                        plan_id: session?.metadata?.plan_id,
                        current_plan_start: new Date(subsData?.current_period_start * 1000),
                        current_plan_end: new Date(subsData?.current_period_end * 1000),
                        payment_id: session.id,
                        stripe_subs_id: subsData.id,
                        user_id: req?.user?._id,
                        amount: session?.amount_total / 100,
                        payment_status: session?.payment_status === 'paid' ? 'Success' : 'Failed'
                    })

                    const planDetails = await Product_Plan.findById(session?.metadata?.plan_id)
                    const startDate = new Date(subsData?.created * 1000);
                    const endDate = new Date(startDate);
                    switch (planDetails.plan_interval) {
                        case 'day':
                            endDate.setDate(endDate.getDate() + planDetails.plan_interval_count);
                            break;
                        case 'week':
                            endDate.setDate(endDate.getDate() + (planDetails.plan_interval_count * 7));
                            break;
                        case 'month':
                            endDate.setMonth(endDate.getMonth() + planDetails.plan_interval_count);
                            break;
                        case 'year':
                            endDate.setFullYear(endDate.getFullYear() + planDetails.plan_interval_count);
                            break;
                        default:
                            throw new Error('Unsupported interval type');
                    }

                    await stripe.subscriptions.update(session.subscription, {
                        cancel_at: Math.floor(endDate.getTime() / 1000),
                    });

                    if (_.isEmpty(saveData) || !saveData._id) {
                        res.status(400).send({ status: 400, data: {}, message: 'Payment could not be verified' });
                    } else {
                        res.status(200).send({ status: 200, data: saveData, message: 'Payment Successful' });
                    }
                } else {
                    const newSubscription = await SubscriptionUser.create(subs_data)

                    const saveData = await Product_Payment.create({
                        product_id: session?.metadata?.product_id,
                        payment_id: session.id,
                        user_id: req?.user?._id,
                        amount: session?.amount_total / 100,
                        payment_status: session?.payment_status === 'paid' ? 'Success' : 'Failed'
                    })

                    if (_.isEmpty(saveData) || !saveData._id) {
                        res.status(400).send({ status: 400, data: {}, message: 'Payment could not be verified' });
                    } else {
                        res.status(200).send({ status: 200, data: saveData, message: 'Payment Successful' });
                    }
                }
            } else {
                res.status(400).send({ status: 400, data: session, message: 'Payment Failed' });
            }
        } catch (error) {
            res.status(500).send({ status: 500, message: error.message });
        }
    }

    async subscription_webhook(req, res) {
        try {
            const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
            const sig = req.headers['stripe-signature'];

            let event;
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

            if (event.type === 'invoice.payment_succeeded' || event.type === 'invoice.payment_failed') {
                const session = event.data?.object
                if (session && session.subscription) {
                    await stripe_webhook.invoice_payment(session)
                }
            }
            res.status(200).send();
        } catch (e) {
            console.log(e.message, 'Webhook')
            res.status(500).send({ status: 500, message: e.message });
        }
    }
}

module.exports = new StripePaymentController();