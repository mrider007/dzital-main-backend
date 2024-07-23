const PayoutRequest = require("../models/payout_request.model");
const PayoutRequestRepo = require("../repositories/payout_request.repository");
const Transaction = require('../models/transaction.model');

class Payout_Request_Controller {
    constructor() { }

    async new_request(req, res) {
        try {
            req.body.user_id = req.user._id
            if (!req.user.wallet_amount || req.body.amount > req.user.wallet_amount) {
                return res.status(400).send({ status: 400, message: "Insufficient Wallet Amount" })
            }
            const saveRequest = await PayoutRequest.create(req.body)
            if (_.isEmpty(saveRequest) || !saveRequest._id) {
                res.status(404).send({ status: 400, message: "Payment Request can not be created" })
            } else {
                res.status(200).send({ status: 200, message: "Payment Request has been created", data: saveRequest })
            }
        } catch (error) {
            res.status(500).send({ status: 500, message: error.message });
        }
    }

    async get_all_requests(req, res) {
        try {
            const request_list = await PayoutRequestRepo.list(req)
            if (_.isEmpty(request_list)) {
                res.status(400).send({ status: 400, message: "No Payment Request Found" })
            } else {
                res.status(200).send({ status: 200, data: request_list, message: "Payment Request list has been fetched successfully" })
            }
        } catch (error) {
            res.status(500).send({ status: 500, message: error.message });
        }
    }

    async update_request(req, res) {
        try {
            const update_request = await PayoutRequestRepo.updateOne({ _id: req.params.id }, req.body)
            if (_.isEmpty(update_request) || !update_request._id) {
                res.status(404).send({ status: 400, message: "Payment Request Not Found" })
            } else {
                if (req.body.status === 'Approved') {
                    const userData = await User.findById(update_request.user_id)
                    let transaction_data = { user_id: update_request.user_id }
                    transaction_data.closing_amount = userData.wallet_amount - update_request.amount
                    transaction_data.opening_amount = userData.wallet_amount
                    transaction_data.debit = update_request.amount
                    const saveTransaction = await Transaction.create(transaction_data)
                    if (_.isEmpty(saveTransaction) || !saveTransaction._id) {
                        res.status(400).send({ status: 400, message: 'Transaction could not be created' })
                    } else {
                        userData.wallet_amount = saveTransaction.closing_amount
                        await userData.save()
                    }
                }
                res.status(200).send({ status: 200, data: update_request, message: "Payment Request has been updated successfully" })
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message })
        }
    }

}

module.exports = new Payout_Request_Controller();