const mongoose = require('mongoose');
const Admin = require('../models/admin.model');
const Freelancer = require('../models/product_freelancer.model');

class freelancerController {
    constructor() { }

    /** Admin Freelancer Post */
    async add(req, res) {
        try {
            let adminInfo = await Admin.findOne({ _id: req.user._id });
            if (!_.isEmpty(adminInfo)) {
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
            res.send({ status: 500, message: e.message });
        }
    };

    
}

module.exports = new freelancerController();