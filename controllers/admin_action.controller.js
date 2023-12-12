const mongoose = require('mongoose');
const Action = require('../models/admin_action.model');
const adminActionRepo = require('../repositories/admin_action.repository');

class adminActionController {
    constructor() { }

    async add(req, res) {
        try {
            req.body.slug = req.body.name.trim().replace(/\s+/g, '-').toLowerCase();
            let actionAdd = await Action.create(req.body);
            if (!_.isEmpty(actionAdd) && actionAdd._id) {
                res.send({ status: 200, data: actionAdd, message: 'Admin Action has been added successfully' });
            }
            else {
                res.send({ status: 400, data: {}, message: 'Admin Action has been added successfully' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async list(req, res) {
        try {
            if (!req.body.page) {
                req.body.page = 1;
            } else {
                req.body.page = parseInt(req.body.page);
            }

            if (!req.body.limit) {
                req.body.limit = 10;
            } else {
                req.body.limit = parseInt(req.body.limit);
            }

            let actionsList = await adminActionRepo.list(req);
            if (!_.isEmpty(actionsList)) {
                res.status(200).send({ status: 200, data: actionsList.docs, total: actionsList.total, limit: actionsList.limit, page: actionsList.page, pages: actionsList.pages, message: 'Action list fetched successfully' });
            } else {
                res.status(400).send({ status: 400, data: [], message: 'Action not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async edit(req, res) {
        try {
            const action_id = new mongoose.Types.ObjectId(req.params.id);
            let actionDetails = await Action.findOne({ _id: action_id });
            if (!_.isEmpty(actionDetails) && actionDetails._id) {
                let actionUpdate = await adminActionRepo.updateById(req.body, action_id);
                if (!_.isEmpty(actionUpdate) && actionUpdate._id) {
                    res.send({ status: 200, data: actionUpdate, message: 'Action has been updated successfully' });
                }
                else {
                    res.send({ status: 400, data: {}, message: "Action could not be updated" });
                }
            }
            else {
                res.send({ status: 400, data: {}, message: 'Action not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

}

module.exports = new adminActionController();