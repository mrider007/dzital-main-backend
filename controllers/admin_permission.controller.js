const mongoose = require('mongoose');
const Permission = require('../models/admin_permission.model');
const permissionRepo = require('../repositories/admin_permission.repository');

class permissionController {
    constructor() { }

    async add(req, res) {
        try {
            let permissionCheck = await Permission.findOne({ name: req.body.name });
            if (!_.isEmpty(permissionCheck) && permissionCheck._id) {
                res.status(400).send({ status: 400, data: {}, message: 'Permission Already Exists' });
            }
            else {
                req.body.slug = req.body.name.trim().replace(/\s+/g, '-').toLowerCase();
                let permissionAdd = await Permission.create(req.body);
                if (!_.isEmpty(permissionAdd) && permissionAdd._id) {
                    res.status(200).send({ status: 200, data: permissionAdd, message: 'Permission has been added successfully' });
                }
                else {
                    res.status(400).send({ status: 400, data: {}, message: 'Permission could not be added' });
                }
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async list(req, res) {
        try {
            if (!req.body.page) {
                req.body.page = 1;
            }
            else {
                req.body.page = parseInt(req.body.page);
            }

            if (!req.body.limit) {
                req.body.limit = 10;
            }
            else {
                req.body.limit = parseInt(req.body.limit);
            }

            let permission = await permissionRepo.list(req);
            if (!_.isEmpty(permission)) {
                res.status(200).send({ status: 200, data: permission.docs, total: permission.total, limit: permission.limit, page: permission.page, pages: permission.pages, message: 'Permission list fetched successfully' });
            }
            else {
                res.status(400).send({ status: 400, data: [], message: 'No Permission found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async details(req, res) {
        try {
            let permission_id = new mongoose.Types.ObjectId(req.params.id);
            let permissionDetails = await Permission.findOne({ _id: permission_id });
            if (!_.isEmpty(permissionDetails) && permissionDetails._id) {
                res.status(200).send({ status: 200, data: permissionDetails, message: 'Permission Details has been fetched' });
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'Permission not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async update(req, res) {
        try {
            const permission_id = new mongoose.Types.ObjectId(req.params.id);
            let permissionInfo = await Permission.findOne({ _id: permission_id });
            if (!_.isEmpty(permissionInfo) && permissionInfo._id) {
                let permissionUpdate = await permissionRepo.updateById(req.body, permission_id);
                res.status(200).send({ status: 200, data: permissionUpdate, message: 'Permission has been updated successfully' });
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'Permission not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };
}

module.exports = new permissionController();