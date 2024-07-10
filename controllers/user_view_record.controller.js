const mongoose = require('mongoose');
const UserProductViewRecord = require('../models/user_view_record.model');
const userProductViewRecordRepo = require('../repositories/user_view_record.repository');

class UserProductViewRecordController {
    constructor() { }

    async saveUserProductViewRecord(req, res) {
        try {
            if (!_.has(req.body, 'productId')) {
                res.status(400).send({ status: 400, message: 'Product Id is Required' });
            }
            else {
                req.body.userId = req.user._id;
                let checkRecord = await UserProductViewRecord.findOne({ userId: req.user._id, productId: new mongoose.Types.ObjectId(req.body.productId) });
                if (!_.isEmpty(checkRecord) && checkRecord._id) {
                    res.status(400).send({ status: 400, message: 'User Product View Record Already Exists' });
                }
                else {
                    let saveData = await UserProductViewRecord.create(req.body);
                    if (!_.isEmpty(saveData) && saveData._id) {
                        res.status(200).send({ status: 200, data: saveData, message: 'User Product View Record Saved Successfully' });
                    } else {
                        res.status(400).send({ status: 400, message: 'User Product View Record could not be saved' });
                    }
                }
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async userProductViewRecordList(req, res) {
        try {
            let userProductViews = await userProductViewRecordRepo.UserProductViewRecord(req);
            if (!_.isEmpty(userProductViews)) {
                res.status(200).send({ status: 200, data: userProductViews, message: 'User Product View Record Fetched Successfully' });
            } else {
                res.status(201).send({ status: 201, message: 'No Record Found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };
}

module.exports = new UserProductViewRecordController();