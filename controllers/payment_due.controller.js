const paymentDueRepo = require("../repositories/payment_due.repository");

class paymentDueController {
    constructor() { }

    async update(req, res) {
        try {
            if (_.has(req.body, 'status') && req.body.status === 'Paid') {
                req.body.total_amount = 0
                req.body.payable_amount = 0
            }
            const updatePaymentDue = await paymentDueRepo.updateById(req.params.id, req.body);
            if (_.isEmpty(updatePaymentDue) || !updatePaymentDue?._id) {
                res.status(400).send({ statud: 400, message: 'Data can not be updated' })
            } else {
                res.status(200).send({ status: 200, data: updatePaymentDue, message: 'Payment Due Has Been Updated Successfully' })
            }
        } catch (error) {
            res.status(500).send({ status: 500, message: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const paymentDueList = await paymentDueRepo.list(req);
            if (_.isEmpty(paymentDueList)) {
                res.status(400).send({ status: 400, message: 'No Payment Due Found' })
            } else {
                res.status(200).send({ status: 200, data: paymentDueList, message: 'Payment Due List has been fetched successfully' })
            }
        } catch (error) {
            res.status(500).send({ status: 500, message: error.message });
        }
    }
}

module.exports = new paymentDueController();