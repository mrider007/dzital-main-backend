const subscriptionUserRepo = require("../repositories/subscription_user.repository");

class Subs_User_Controller {

    constructor() { }

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

}

module.exports = new Subs_User_Controller()