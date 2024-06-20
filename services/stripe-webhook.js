const SubscriptionUser = require('../models/subscription_user.model');
const SubscriptionPayment = require('../models/subscription_history.model');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const stripe_webhook = {
    invoice_payment : async (session) => {
        try {
            const subsData = await stripe.subscriptions.retrieve(
                session?.subscription
            );
            if (subsData && subsData.create !== subsData.current_period_start) {
                const subscribedUser = await SubscriptionUser.findOne({ payment_id: subsData.id })
                if (!_.isEmpty(subscribedUser) && subscribedUser._id && subscribedUser.purchase_mode === 'Subscription') {
                    subscribedUser.current_plan_start = new Date(subsData?.current_period_start * 1000)
                    subscribedUser.current_plan_end = new Date(subsData?.current_period_end * 1000)
                    subscribedUser.status = session?.payment_status === 'paid' ? 'Active' : 'Inactive'
                    await subscribedUser.save()
                    await SubscriptionPayment.create({
                        plan_id: session?.metadata?.plan_id,
                        current_plan_start: new Date(subsData?.current_period_start * 1000),
                        current_plan_end: new Date(subsData?.current_period_end * 1000),
                        payment_id: session.id,
                        stripe_subs_id: subsData.id,
                        user_id: subscribedUser.user_id,
                        amount: session?.amount_total / 100,
                        payment_status: session?.payment_status === 'paid' ? 'Success' : 'Failed'
                    })
                }
            }
            return
        } catch (e) {
            throw e
        }
    }
}

module.exports = stripe_webhook;