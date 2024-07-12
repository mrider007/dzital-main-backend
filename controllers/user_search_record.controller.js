const mongoose = require('mongoose');
const UserSearchRecord = require('../models/user_search_record.model');
const userSearchRecordRepo = require('../repositories/user_search_record.repository');

class UserProductViewRecordController {
    constructor() { }

    async saveUserSearchRecord(req, res) {
        try {
            if (!_.has(req.body, 'categoryId')) {
                res.status(400).send({ status: 400, message: 'Category Id is Required' });
            }
            else {
                req.body.userId = req.user._id;
                
                let location = req.body.address;

                const spot = location.split(', ');
                
                const country = spot[spot.length - 1];

                req.body.country = country;
                let saveData = await UserSearchRecord.create(req.body);
                if (!_.isEmpty(saveData) && saveData._id) {
                    res.status(200).send({ status: 200, data: saveData, message: 'User Search Record Saved Successfully' });
                } else {
                    res.status(400).send({ status: 400, message: 'User Search Record could not be saved' });
                }
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async userSearchRecordList(req, res) {
        try {
            let searchRecord = await userSearchRecordRepo.List(req);
            if (!_.isEmpty(searchRecord)) {
                res.status(200).send({ status: 200, data: searchRecord, message: 'User Search Records Fetched Successfully' });
            } else {
                res.status(201).send({ status: 201, message: 'No Record Found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };
}

module.exports = new UserProductViewRecordController();