const Product_Plan = require('../models/product_plan.model');
const SubscriptionPayment = require('../models/subscription_history.model');
const Product = require('../models/product.model');
const Product_Payment = require('../models/product_payment.model');
const SubscriptionUser = require('../models/subscription_user.model');
const stripe_webhook = require('../services/stripe-webhook');
const membership_plan = require('../models/membership_plan.model');
const membership_user = require('../models/membership_user.model');
const Transaction = require('../models/transaction.model');
const User = require('../models/user.model');
const product_cart = require('../models/product_cart.model');
const promo_code = require('../models/promo_code.model');
const Order = require('../models/order.model');
const ProductCartRepository = require('../repositories/product_cart.repository');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const redirect_url = 'https://www.dzital.com';

class StripePaymentController {

    constructor() { }

    async checkout_payment(req, res) {
        try {
            const cartInfo = await product_cart.findOne({ user_id: req.user._id })
            if (!cartInfo || cartInfo.items.length === 0) {
                return res.status(404).send({ status: 404, message: "cart is empty" })
            }
            let amount = 0
            let discount = 0
            cartInfo.items?.forEach((item) => {
                amount += item.total_price
            })
            if (_.has(req.body, 'coupon') && req.body.coupon !== '') {
                const couponInfo = await promo_code.findById(req.body.coupon)
                if (couponInfo?.type === 'Flat') {
                    discount = couponInfo.value
                }
                if (couponInfo?.type === 'Percentage') {
                    discount = (amount * couponInfo.value) / 100;
                }
                amount -= discount;
            }
            const DOMAIN = req.body?.redirect || redirect_url
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: `${req.user.name} cart checkout`,
                            },
                            unit_amount: amount * 100, // Amount in cents (e.g., $20.00)
                        },
                        quantity: 1,
                    },
                ],
                metadata: {
                    user_id: req.user?._id?.toString(),
                    discount_amount: discount,
                    promo_code: req.body?.coupon || ''
                },
                customer_email: req?.user?.email,
                success_url: `${DOMAIN}/#/stripe-response/${req.user._id}?session_id={CHECKOUT_SESSION_ID}&type=checkout`,
                cancel_url: `${DOMAIN}/#/stripe-response/${req.user._id}?session_id={CHECKOUT_SESSION_ID}&type=checkout`,
            });
            if (_.isEmpty(session) || !session.id) {
                res.status(400).send({ status: 400, message: 'Session can not be created' })
            } else {
                res.status(200).json({ status: 200, data: session, message: "Checkout session created successfully" });
            }

        } catch (error) {
            res.status(500).send({ status: 500, message: error.message });
        }
    }

    async create_payment(req, res) {
        try {
            const { product_id, quantity, redirect, id } = req.body
            const productInfo = await Product.findOne({ _id: product_id })

            if (!productInfo) {
                return res.status(404).send({ status: 404, message: 'Product Not Found' });
            }

            if (productInfo.purchase_mode !== 'Paid' || !productInfo.product_price || productInfo.product_price === 0) {
                return res.status(400).send({ status: 400, message: `Product doesn't support Payment` })
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
                    user_id: req.user?._id?.toString(),
                },
                customer_email: req?.user?.email,
                success_url: `${DOMAIN}/#/stripe-response/${id}?session_id={CHECKOUT_SESSION_ID}&type=payment`,
                cancel_url: `${DOMAIN}/#/stripe-response/${id}?session_id={CHECKOUT_SESSION_ID}&type=payment`,
            });

            if (_.isEmpty(session) || !session.id) {
                res.status(400).send({ status: 400, message: 'Session can not be created' })
            } else {
                res.status(200).json({ status: 200, data: session.id, message: "Checkout session created successfully" });
            }

        } catch (error) {
            res.status(500).send({ status: 500, message: error.message });
        }
    }

    async subscribe_payment(req, res) {
        try {
            const { plan_id, redirect, id } = req.body;

            const plan_details = await Product_Plan.findById(plan_id);
            if (!plan_details) {
                return res.status(404).send({ error: 'Plan Not Found' });
            }

            const DOMAIN = redirect || redirect_url

            const subscription = await SubscriptionUser.findOne({ product_id: plan_details?.product_id, user_id: req.user?._id });

            if (subscription && subscription.status === 'Active') {
                return res.status(400).send({ status: 400, message: "You Already Have An Active Subscription For This Product" })
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
                    product_id: plan_details?.product_id?.toString(),
                    user_id: req.user?._id?.toString(),
                },
                customer_email: req?.user?.email,
                success_url: `${DOMAIN}/#/stripe-response/${id}?session_id={CHECKOUT_SESSION_ID}&type=subscription`,
                cancel_url: `${DOMAIN}/#/stripe-response/${id}?session_id={CHECKOUT_SESSION_ID}&type=subscription`
            });

            if (_.isEmpty(session) || !session.id) {
                res.status(400).send({ status: 400, message: 'Session can not be created' })
            } else {
                res.status(200).json({ status: 200, data: session.id, message: "Checkout session created successfully" });
            }
        } catch (error) {
            res.status(500).send({ status: 500, message: error.message });
        }
    }

    async membership_payment(req, res) {
        try {
            const { membership_id, redirect } = req.body;
            const plan_details = await membership_plan.findById(membership_id);
            if (!_.isEmpty(plan_details) && plan_details._id) {
                const membership = await membership_user.findOne({ membership_id: membership_id, user_id: req.user?._id });
                const currentDate = new Date();
                if (membership && membership.membership_status === 'Active' && currentDate < membership.membership_end_date) {
                    return res.status(400).send({ status: 400, message: "You Already Have Active Membership" });
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
                                    name: plan_details.title,
                                },
                                unit_amount: Number(plan_details.amount) * 100,
                            },
                            quantity: 1,
                        },
                    ],
                    metadata: {
                        membership_id: plan_details?._id?.toString(),
                        user_id: req.user?._id?.toString(),
                    },
                    customer_email: req?.user?.email,
                    success_url: `${DOMAIN}/#/stripe-response/${membership_id}?session_id={CHECKOUT_SESSION_ID}&type=membership`,
                    cancel_url: `${DOMAIN}/#/stripe-response/${membership_id}?session_id={CHECKOUT_SESSION_ID}&type=membership`
                });

                if (_.isEmpty(session) || !session.id) {
                    res.status(400).send({ status: 400, data: {}, message: 'Session can not be created' })
                } else {
                    res.status(200).json({ status: 200, data: session.id, message: "Checkout Session Created Successfully" });
                }
            } else {
                res.status(404).send({ status: 404, message: 'Membership Not Found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    }

    async verify_payment(req, res) {
        try {
            const { id } = req.body;
            const session = await stripe.checkout.sessions.retrieve(id);
            if (session?.payment_status === 'paid' && session?.status === 'complete') {
                let subs_data = {
                    product_id: session?.metadata?.product_id,
                    user_id: session?.metadata?.user_id,
                    payment_id: session.id,
                    purchase_mode: session?.mode === 'subscription' ? 'Subscription' : 'Paid',
                    amount: session?.amount_total / 100,
                    status: session?.payment_status === 'paid' ? 'Active' : 'Inactive'
                }
                if (session?.mode === 'subscription') {
                    const checkSubscription = await SubscriptionPayment.findOne({ payment_id: session.id })
                    if (!_.isEmpty(checkSubscription) && checkSubscription._id) {
                        return res.status(200).send({ status: 200, message: "Record already added" })
                    }
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
                        user_id: session?.metadata?.user_id,
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
                            throw new Error('Unsupported Interval Type');
                    }

                    await stripe.subscriptions.update(session.subscription, {
                        cancel_at: Math.floor(endDate.getTime() / 1000),
                    });

                    if (_.isEmpty(saveData) || !saveData._id) {
                        res.status(400).send({ status: 400, message: 'Payment could not be verified' });
                    } else {
                        const productInfo = await Product.findById(newSubscription.product_id)
                        const userData = await User.findById(productInfo.userId).populate('commission_package')
                        const cut_amount = (userData?.commission_package?.commission_percentage || 20) / 100
                        const payout = (saveData.amount - (saveData.amount * cut_amount)).toFixed(2)
                        const transaction_obj = {
                            user_id: productInfo.userId,
                            opening_amount: userData.wallet_amount || 0,
                            credit: Number(payout),
                            closing_amount: userData.wallet_amount ? userData.wallet_amount + Number(payout) : Number(payout),
                        }
                        await Transaction.create(transaction_obj)
                        userData.wallet_amount = transaction_obj.closing_amount
                        await userData.save()
                        res.status(200).send({ status: 200, data: newSubscription, message: 'Payment Successful' });
                    }
                } else {
                    const checkSubscription = await Product_Payment.findOne({ payment_id: session.id })
                    if (!_.isEmpty(checkSubscription) && checkSubscription._id) {
                        return res.status(200).send({ status: 200, message: "Record already added" })
                    }
                    const newSubscription = await SubscriptionUser.create(subs_data);

                    const saveData = await Product_Payment.create({
                        product_id: session?.metadata?.product_id,
                        payment_id: session.id,
                        user_id: session?.metadata?.user_id,
                        amount: session?.amount_total / 100,
                        payment_status: session?.payment_status === 'paid' ? 'Success' : 'Failed'
                    })

                    if (_.isEmpty(saveData) || !saveData._id) {
                        res.status(400).send({ status: 400, message: 'Payment could not be verified' });
                    } else {
                        const productInfo = await Product.findById(newSubscription.product_id)
                        const userData = await User.findById(productInfo.userId).populate('commission_package')
                        const cut_amount = (userData?.commission_package?.commission_percentage || 20) / 100
                        const payout = (saveData.amount - (saveData.amount * cut_amount)).toFixed(2)
                        const transaction_obj = {
                            user_id: productInfo.userId,
                            opening_amount: userData.wallet_amount || 0,
                            credit: Number(payout),
                            closing_amount: userData.wallet_amount ? userData.wallet_amount + Number(payout) : Number(payout),
                        }
                        await Transaction.create(transaction_obj)
                        userData.wallet_amount = transaction_obj.closing_amount
                        await userData.save()
                        res.status(200).send({ status: 200, data: newSubscription, message: 'Payment Successful' });
                    }
                }
            } else {
                res.status(400).send({ status: 400, data: session, message: 'Payment Failed' });
            }
        } catch (error) {
            res.status(500).send({ status: 500, message: error.message });
        }
    }

    async verify_checkout_payment(req, res) {
        try {
            const { id } = req.body;
            const session = await stripe.checkout.sessions.retrieve(id);
            if (session?.payment_status === 'paid' && session?.status === 'complete') {
                const cartInfo = await product_cart.findOne({ user_id: session?.metadata?.user_id });
                if (!cartInfo || !cartInfo._id) {
                    res.status(404).send({ status: 404, message: 'cart item Not Found' });
                } else {
                    let list = []
                    for (let i = 0; i < cartInfo.items.length; i++) {
                        const product_id = cartInfo.items[i].product_id
                        const productInfo = await Product.findById(product_id)
                        let obj = {
                            product_id: cartInfo.items[i].product_id,
                            total_price: cartInfo.items[i].total_price,
                            quantity: cartInfo.items[i].quantity,
                            category_id: productInfo.category_id,
                        }
                        list.push(obj)
                    }

                    const actual_price = session?.amount_total / 100
                    const orderData = {
                        user_id: session?.metadata?.user_id,
                        order_id: 'ORD' + Math.floor(Math.random() * 100000).toString(),
                        discount_amount: Number(session?.metadata?.discount_amount) || 0,
                        status: 'Pending',
                        payment_mode: 'card',
                        final_amount: actual_price,
                        total_amount: actual_price + (Number(session?.metadata?.discount_amount) || 0),
                        items: list
                    }
                    if (session?.metadata?.promo_code && session?.metadata?.promo_code !== '') {
                        orderData.promocode_id = session?.metadata?.promo_code
                    }
                    const newOrder = await Order.create(orderData)
                    if (_.isEmpty(newOrder) || !newOrder._id) {
                        res.status(400).send({ status: 400, message: "Order can not be created" })
                    } else {
                        let updateCart = await ProductCartRepository.updateCart({ user_id: session?.metadata?.user_id }, { 'items': [] });
                        res.send({ status: 200, data: newOrder, message: 'payment verified ordered created successfully' })
                    }
                }
            } else {
                res.status(400).send({ status: 400, data: session, message: 'Payment Failed' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    }

    async membership_payment_verfication(req, res) {
        try {
            const { id } = req.body;
            const session = await stripe.checkout.sessions.retrieve(id);
            if (session?.payment_status === 'paid' && session?.status === 'complete') {
                const membership_details = await membership_plan.findById(session?.metadata?.membership_id)
                if (!membership_details || !membership_details._id) {
                    return res.status(404).send({ status: 404, message: 'Membership Not Found' });
                }
                const alreadyMember = await membership_user.findOne({ payment_id: session?.id })
                if (!_.isEmpty(alreadyMember) && alreadyMember._id) {
                    return res.status(200).send({ status: 200, message: 'Record Already Added' });
                }
                const currentDate = new Date();
                currentDate.setMonth(currentDate.getMonth() + membership_details.no_of_months);
                const saveData = await membership_user.create({
                    membership_id: session?.metadata?.membership_id,
                    payment_id: session.id,
                    membership_status: session?.payment_status === 'paid' ? 'Active' : 'Inactive',
                    user_id: session?.metadata?.user_id,
                    membership_end_date: currentDate,
                    type: membership_details.type,
                    amount: session?.amount_total / 100,
                    payment_status: session?.payment_status === 'paid' ? 'Success' : 'Failed'
                })

                if (_.isEmpty(saveData) || !saveData._id) {
                    res.status(400).send({ status: 400, message: 'Payment could not be verified' });
                } else {
                    if (membership_details.type === 'Premium_Membership') {
                        await User.findByIdAndUpdate(session?.metadata?.user_id, { plan_id: membership_details._id })
                    }
                    res.status(200).send({ status: 200, data: saveData, message: 'Payment Successful' });
                }
            } else {
                res.status(400).send({ status: 400, data: session, message: 'Payment Failed' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
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
            if (event.type === 'customer.subscription.deleted' || event.type === 'customer.subscription.updated') {
                const session = event.data?.object
                await stripe_webhook.cancel_subscription(session)
            }
            res.status(200).send();
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    }
}

module.exports = new StripePaymentController();