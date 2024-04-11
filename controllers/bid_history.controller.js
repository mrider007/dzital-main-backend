const productModel = require('../models/product.model');
const bid_historyModel = require('../models/bid_history.model');
const bidHistoryRepository = require('../repositories/bid_history.repository');

class bidHistoryController {
    constructor() { }

    async bidAdd(req, res) {
        try {
            if (!req.user || !req.user._id) {
                return res.status(401).send({ status: 401, message: "You are Unauthorized. Please Login again." })
            }

            const { productId, bid_amount } = req.body

            const check = await productModel.findById(productId)

            if (!check) return res.status(404).send({ status: 404, message: 'Product not found' })
            if (check.bid_now === "false" || !check.bid_now) return res.status(400).send({ status: 400, message: 'this product does not support bidding' })

            const currentDate = new Date()
            const endDate = new Date(check.bid_end_date)
            const startDate = new Date(check.bid_start_date)

            if (currentDate < startDate) {
                return res.status(400).send({ status: 400, message: "Bidding not started yet" })
            }

            if (currentDate > endDate) {
                return res.status(400).send({ status: 400, message: "Bidding already closed" })
            }

            const highestBid = await bid_historyModel.findOne({ productId: check._id }).sort({ bid_amount: -1 })

            if (highestBid && bid_amount < (highestBid.bid_amount + Number(check.bid_increament_value))) {
                return res.status(400).send({ status: 400, message: 'Bid amount should be higher than last bid + increment price' })
            }

            if (!highestBid && bid_amount < (check.bid_start_price + Number(check.bid_increament_value))) {
                return res.status(400).send({ status: 400, message: 'Bid amount should be higher than start price + increment price' })
            }

            let bidSave = await bid_historyModel.create({
                productId,
                bid_amount,
                userId: req.user._id
            });

            if (!_.isEmpty(bidSave) && bidSave._id) {
                res.status(200).send({ status: 200, data: bidSave, message: 'bid has been added successfully' });
            }
            else {
                res.status(400).send({ status: 400, message: 'bid not added' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async bidlist(req, res) {
        try {
            if (!req.body.page) {
                req.body.page = 1;
            } else {
                req.body.page = parseInt(req.body.page);
            }

            if (!req.body.limit) {
                req.body.limit = 10;
            }
            else {
                req.body.limit = parseInt(req.body.limit);
            }

            let bids = await bidHistoryRepository.list(req);
            if (!_.isEmpty(bids)) {
                res.status(200).send({ status: 200, data: bids.docs, total: bids.total, limit: bids.limit, page: bids.page, pages: bids.pages, message: 'Attribute list fetched successfully' });
            }
            else {
                res.status(201).send({ status: 201, data: [], message: 'No bids found' });
            }

        }
        catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    }


}

module.exports = new bidHistoryController();