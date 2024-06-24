const SubscriptionUser = require('../models/subscription_user.model');
const SubscriptionPayment = require('../models/subscription_history.model');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const stripe_webhook = {
    invoice_payment: async (session) => {
        try {
            const subsData = await stripe.subscriptions.retrieve(
                session?.subscription
            );

            if (subsData && subsData.created !== subsData.current_period_start) {
                const subscribedUser = await SubscriptionPayment.findOne({ stripe_subs_id: subsData.id }).sort({ createdAt: -1 })
                if (!_.isEmpty(subscribedUser) && subscribedUser._id) {
                    const dateObject = new Date(subsData.current_period_start * 1000);
                    const dateObject2 = new Date(subscribedUser.current_plan_start)

                    if (dateObject.getTime() === dateObject2.getTime()) {
                        return
                    }

                    let current_plan_start = new Date(subsData?.current_period_start * 1000)
                    let current_plan_end = new Date(subsData?.current_period_end * 1000)
                    let status = session?.status === 'paid' ? 'Active' : 'Inactive'
                    await SubscriptionUser.findOneAndUpdate({ payment_id: subsData.id }, { current_plan_start, current_plan_end, status })
                    await SubscriptionPayment.create({
                        plan_id: subscribedUser.plan_id,
                        current_plan_start: new Date(subsData?.current_period_start * 1000),
                        current_plan_end: new Date(subsData?.current_period_end * 1000),
                        payment_id: session.id,
                        stripe_subs_id: subsData.id,
                        user_id: subscribedUser.user_id,
                        amount: session?.amount_paid / 100,
                        payment_status: session?.status === 'paid' ? 'Success' : 'Failed'
                    })
                }
            }
            return
        } catch (e) {
            throw e;
        }
    }
}

module.exports = stripe_webhook;