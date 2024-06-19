const ProductPlan = require("../models/product_plan.model");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class ProductPlanController {
    constructor() { }

    async createPlan(req, res) {
        try {
            if (req.body?.plan_status === 'Active') {
                const product = await stripe.products.create({
                    name: req.body.plan_name,
                });
                const stripePrice = await stripe.prices.create({
                    unit_amount: req.body.plan_price * 100,
                    currency: 'usd',
                    recurring: { interval: req.body.plan_interval, interval_count: 1 },
                    product: product.id,
                });

                req.body.stripe_product_id = product.id;
                req.body.stripe_price_id = stripePrice.id;
            }

            const savePlan = await ProductPlan.create(req.body)
            if (_.isEmpty(savePlan) || !savePlan._id) {
                res.status(400).send({ status: 400, message: 'Plan could not be Created' });
            } else {
                res.status(200).send({ status: 200, data: savePlan, message: 'Plan Created Successfully' });
            }
        } catch (error) {
            res.status(500).send({ status: 500, message: error.message });
        }
    }

    async deletePlan(req, res) {
        try {
            const deletedPlan = await ProductPlan.findOneAndDelete({ product_id: req.params.id })
            if (_.isEmpty(deletedPlan) || !deletedPlan._id) {
                res.status(400).send({ status: 400, message: `Plan can't be Deleted` })
            } else {
                res.status(200).send({ status: 200, message: "Plan Deleted Successfully" })
            }
        } catch (error) {
            res.send({ status: 500, message: error.message })
        }
    }
}

module.exports = new ProductPlanController();