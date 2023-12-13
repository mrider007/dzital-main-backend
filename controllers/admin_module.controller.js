const mongoose = require('mongoose');
const Module = require('../models/admin_module.model');
const ModuleRepo = require('../repositories/admin_module.repository');

class adminModuleController {
    constructor() { }

    async add(req, res) {
        try {
            let moduleCheck = await Module.findOne({ name: req.body.name });
            if (!_.isEmpty(moduleCheck) && moduleCheck._id) {
                res.send({ status: 400, data: {}, message: 'Module Already Exists' });
            }
            else {
                req.body.slug = req.body.name.trim().replace(/\s+/g, '-').toLowerCase();
                let actionAdd = await Module.create(req.body);
                if (!_.isEmpty(actionAdd) && actionAdd._id) {
                    res.send({ status: 200, data: actionAdd, message: 'Module has been added successfully' });
                }
                else {
                    res.send({ status: 400, data: {}, message: 'Module could not be added' });
                }
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async details(req, res) {
        try {
            const module_id = new mongoose.Types.ObjectId(req.params.id);
            let moduleInfo = await Module.findById(module_id);
            if (!_.isEmpty(moduleInfo) && moduleInfo._id) {
                res.send({ status: 200, data: moduleInfo, message: 'Module details has been fetched successfully' });
            }
            else {
                res.send({ status: 400, data: {}, message: 'Module not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async edit(req, res) {
        try {
            const module_id = new mongoose.Types.ObjectId(req.params.id);
            let moduleInfo = await Module.findById(module_id);
            if (!_.isEmpty(moduleInfo) && moduleInfo._id) {
                let moduleUpdate = await ModuleRepo.updateById(req.body, module_id);
                if (!_.isEmpty(moduleUpdate) && moduleUpdate._id) {
                    res.send({ status: 200, data: moduleUpdate, message: 'Module has been updated successfully' });
                }
                else {
                    res.send({ status: 400, data: {}, message: 'Module could not be updated' });
                }
            }
            else {
                res.send({ status: 400, data: {}, message: 'Module could not be found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
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
            let modules = await ModuleRepo.list(req);  
            if (!_.isEmpty(modules)) {
                res.status(200).send({ status: 200, data: modules.docs, total: modules.total, limit: modules.limit, page: modules.page, pages: modules.pages, message: 'Module list fetched successfully' });                
            }          
            else {
                res.status(201).send({ status: 201, data: [], message: 'Module not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

}

module.exports = new adminModuleController();