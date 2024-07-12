const transaction_repo = require("../repositories/transaction.repository")
const Transaction = require("../models/transaction.model")
const User = require('../models/user.model')

class Transaction_Controller {
    constructor() { }

    async getAll(req, res) {
        try {
            const paymentDueList = await transaction_repo.list(req);
            if (_.isEmpty(paymentDueList)) {
                res.status(400).send({ status: 400, message: 'No Transaction Found' })
            } else {
                res.status(200).send({ status: 200, data: paymentDueList, message: 'Transaction List Has Been Fetched Successfully' })
            }
        } catch (error) {
            res.status(500).send({ status: 500, message: error.message });
        }
    }

    async debit_entry(req, res) {
        try {
            if (!req.body.debit) {
                return res.status(400).send({ status: 400, message: 'Debit Amount is Required' })
            }
            const userData = await User.findById(req.body.user_id)
            req.body.closing_amount = userData.wallet_amount - req.body.debit
            req.body.opening_amount = userData.wallet_amount
            const saveTransaction = await Transaction.create(req.body)
            if (_.isEmpty(saveTransaction) || !saveTransaction._id) {
                res.status(400).send({ status: 400, message: 'Transaction could not be saved' })
            } else {
                userData.wallet_amount = saveTransaction.closing_amount
                await userData.save()
                res.status(200).send({ status: 200, data: saveTransaction, message: 'Transaction Saved Successfully' })
            }
        } catch (error) {
            res.status(500).send({ status: 500, message: error.message })
        }
    }
}

module.exports = new Transaction_Controller();                                  