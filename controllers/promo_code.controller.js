const mongoose = require('mongoose');
const Promocode = require('../models/promo_code.model');

class promocodeController {
    constructor() { }

    async add(req, res) {
        try {
            const saveData = await Promocode.create(req.body);
            if (!_.isEmpty(saveData) && saveData._id) {
                res.status(200).send({ status: 200, data: saveData, message: 'Promocode has been added successfully' });
            }
            else {
                res.status(400).send({ status: 400, message: 'Promocode could not be added' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

}

module.exports = new promocodeController();