const mongoose = require('mongoose');
const Service = require('../models/service_master.model');
const serviceRepo = require('../repositories/service_master.repository');

class serviceController {
    constructor() { }

    async serviceAdd(req, res) {
        try {
            let serviceCheck = await Service.findOne({ title: req.body.title });
            if (!_.isEmpty(serviceCheck) && serviceCheck._id) {
                res.send({ status: 201, data: {}, message: 'Service already exists' });
            } else {
                let saveService = await Service.create(req.body);
                if (!_.isEmpty(saveService) && saveService._id) {
                    res.send({ status: 200, data: saveService, message: 'Service added successfully' });
                } else {
                    res.send({ status: 201, data: {}, message: 'Service could not be added' });
                }
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async serviceList(req, res) {
        try {
            let services = await Service.find();
            if (!_.isEmpty(services)) {
                res.send({ status: 200, data: services, message: 'Service list fetched successfully' });
            } else {
                res.send({ status: 201, data: [], message: 'No Service found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async serviceUpdate(req, res) {
        try {
            let service_id = new mongoose.Types.ObjectId(req.params.id);
            let serviceInfo = await Service.findOne({ _id: service_id });
            if (!_.isEmpty(serviceInfo) && serviceInfo._id) {
                let serviceUpdate = await serviceRepo.updateById(req.body, service_id);
                if (!_.isEmpty(serviceUpdate) && serviceUpdate._id) {
                    res.send({ status: 200, data: serviceUpdate, message: 'Service has been updated successfully' });
                }
                else {
                    res.send({ status: 201, data: {}, message: 'Service could not be updated' });
                }
            } else {
                res.send({ status: 201, data: {}, message: 'Service not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async serviceDelete(req, res) {
        try {
            let service_id = new mongoose.Types.ObjectId(req.params.id);
            let serviceInfo = await Service.findOne({ _id: service_id });
            if (!_.isEmpty(serviceInfo) && serviceInfo._id) {
                let serviceDelete = await serviceRepo.delete(service_id);
                if (!_.isEmpty(serviceDelete) && serviceDelete._id) {
                    res.send({ status: 200, data: serviceDelete, message: 'Service has been removed successfully' });
                }
                else {
                    res.send({ status: 201, data: {}, message: 'Sorry, unable to remove service at this moment!' });
                }
            } else {
                res.send({ status: 201, data: {}, messaage: 'Service not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async serviceDetails(req, res) {
        try {
            let service_id = new mongoose.Types.ObjectId(req.params.id);
            let serviceInfo = await Service.findOne({ _id: service_id });
            if (!_.isEmpty(serviceInfo) && serviceInfo._id) {
                res.send({ status: 200, data: serviceInfo, message: 'Service details fetched successfully' });
            }
            else {
                res.send({ status: 201, data: {}, message: 'Service not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };
}

module.exports = new serviceController();