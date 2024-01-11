const mongoose = require('mongoose');
const User = require('../models/user.model');
const Freelancer = require('../models/product_freelancer.model');
const freelancerRepo = require('../repositories/product_freelancer.repository');

class freelancerController {
    constructor() { }

    /** User Freelancer Post */
    async add(req, res) {
        try {
            let userInfo = await User.findOne({ _id: req.user._id });
            if (!_.isEmpty(userInfo)) {
                req.body.user_id = req.user._id;
                let saveData = await Freelancer.create(req.body);
                if (!_.isEmpty(saveData) && saveData._id) {
                    res.status(200).send({ status: 200, data: saveData, message: 'Freelancer Post saved successfully' });
                }
                else {
                    res.status(400).send({ status: 400, message: 'Freelancer Post could not be saved' });
                }
            } else {
                res.status(400).send({ status: 400, message: 'Admin not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async details(req, res) {
        try {
            const freelancer_id = new mongoose.Types.ObjectId(req.params.id);
            let freelancerInfo = await freelancerRepo.getDetails({ _id: freelancer_id });
            if (!_.isEmpty(freelancerInfo) && freelancerInfo._id) {
                res.status(200).send({ status: 200, data: freelancerInfo, message: 'Product Freelancer details has been fetched successfully' });
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
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
            const freelancer = await freelancerRepo.list(req);
            if (!_.isEmpty(freelancer)) {
                res.status(200).send({ status: 200, data: freelancer.docs, total: freelancer.total, limit: freelancer.limit, page: freelancer.page, pages: freelancer.pages, message: 'Freelancer Products fetched successfully' });
            } else {
                res.status(201).send({ status: 201, data: [], message: 'No Products Found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

}

module.exports = new freelancerController();