const mongoose = require('mongoose');
const Role = require('../models/role.model');
const roleRepo = require('../repositories/role.repository');

class roleController {
    constructor() { }

    async roleAdd(req, res) {
        try {
            let roleCheck = await Role.findOne({ role: req.body.role, isDeleted: false });
            if (!_.isEmpty(roleCheck) && roleCheck._id) {
                res.status(400).send({ status: 400, data: {}, message: 'Role already exists' });
            } else {
                let roleSave = await Role.create(req.body);
                if (!_.isEmpty(roleSave) && roleSave._id) {
                    res.status(200).send({ status: 200, data: roleSave, message: 'Role saved successfully' });
                }
                else {
                    res.status(400).send({ status: 400, data: {}, message: 'Role could not be added' });
                }
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async roleList(req, res) {
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

            let roles = await roleRepo.getRoles(req);
            if (!_.isEmpty(roles)) {
                res.status(200).send({ status: 200, data: roles.docs, total: roles.total, limit: roles.limit, page: roles.page, pages: roles.pages, message: 'Role list fetched successfully' });
            } else {
                res.status(201).send({ status: 201, data: [], message: 'No role found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async roleDetails(req, res) {
        try {
            const roleId = new mongoose.Types.ObjectId(req.params.id);
            let roleInfo = await Role.findOne({ _id: roleId, isDeleted: false });
            if (!_.isEmpty(roleInfo) && roleInfo._id) {
                res.status(200).send({ status: 200, data: roleInfo, message: 'Role details fetched successfully' });
            } else {
                res.status(400).send({ status: 400, data: {}, message: 'Role not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async roleUpdate(req, res) {
        try {
            let roleId = new mongoose.Types.ObjectId(req.params.id);
            let roleInfo = await Role.findOne({ _id: roleId, isDeleted: false });
            if (!_.isEmpty(roleInfo) && roleInfo._id) {
                let roleUpdate = await roleRepo.updateById(req.body, roleInfo._id);
                if (!_.isEmpty(roleUpdate) && roleUpdate._id) {
                    res.status(200).send({ status: 200, data: roleUpdate, message: 'Role has been updated' });
                } else {
                    res.status(400).send({ status: 400, data: {}, message: 'Role could not be updated' });
                }
            } else {
                res.status(400).send({ status: 400, message: 'Role not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async roleDelete(req, res) {
        try {
            const roleId = new mongoose.Types.ObjectId(req.params.id);
            let roleDetails = await Role.findOne({ _id: roleId, isDeleted: false });
            if (!_.isEmpty(roleDetails) && roleDetails._id) {
                let roleDelete = await roleRepo.updateById({ isDeleted: true }, roleDetails._id);
                if (!_.isEmpty(roleDelete) && roleDelete._id) {
                    res.status(200).send({ status: 200, data: roleDelete, message: 'Role has been deleted successfully' });
                } else {
                    res.status(400).send({ status: 400, message: 'Role could not be updated' });
                }
            } else {
                res.status(400).send({ status: 400, message: 'Role not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };
}

module.exports = new roleController();