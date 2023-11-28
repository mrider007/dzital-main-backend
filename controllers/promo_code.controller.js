const mongoose = require('mongoose');
const Promocode = require('../models/promo_code.model');
const promocodeRepo = require('../repositories/promo_code.repository');

class PromocodeController {
    constructor() { }

    async promocodeAdd(req, res) {
        try {
            let promocodeCheck = await Promocode.findOne({ promo_code: req.body.promo_code });
            if (!_.isEmpty(promocodeCheck) && promocodeCheck._id) {
                res.send({ status: 201, data: {}, message: 'Promo code already exists' });
            } else {
                let promocodeSave = await Promocode.create(req.body);
                if (!_.isEmpty(promocodeSave) && promocodeSave._id) {
                    res.send({ status: 200, data: promocodeSave, message: 'Promo code added successfully' });
                } else {
                    res.send({ status: 201, data: {}, message: 'Promo code could not be added' });
                }
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    /** Admin Promo Code List */
    async promocodeList(req, res) {
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

            let promocodes = await promocodeRepo.getPromoCode(req);
            if (!_.isEmpty(promocodes)) {
                res.send({ status: 200, data: promocodes.docs, total: promocodes.total, limit: promocodes.limit, page: promocodes.page, pages: promocodes.pages, message: 'Promo code list fetched successfully' });
            } else {
                res.send({ status: 201, data: [], message: 'No Promo Code Found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async promocodeDetails(req, res) {
        try {
            let promocode_id = new mongoose.Types.ObjectId(req.params.id);
            let promocodeInfo = await Promocode.findOne({ _id: promocode_id });
            if (!_.isEmpty(promocodeInfo) && promocodeInfo._id) {
                res.send({ status: 200, data: promocodeInfo, message: 'Promo code details fetched successfully' });
            } else {
                res.send({ status: 201, data: {}, message: 'Promo code not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    /** User Promo Code List */
    async Promocodes(req, res) {
        try {
            let promocodes = await Promocode.find({ status: 'Active' });
            if (!_.isEmpty(promocodes)) {
                res.send({ status: 200, data: promocodes, message: 'Promocode list fetched successfully' });
            } else {
                res.send({ status: 201, data: [], message: 'No Promocodes found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async promocodeUpdate(req, res) {
        try {
            let promocode_id = new mongoose.Types.ObjectId(req.params.id);
            let promocodeDetails = await Promocode.findOne({ _id: promocode_id });
            if (!_.isEmpty(promocodeDetails) && promocodeDetails._id) {
                let promocodeUpdate = await promocodeRepo.updateById(req.body, promocode_id);
                if (!_.isEmpty(promocodeUpdate) && promocodeUpdate._id) {
                    res.send({ status: 200, data: promocodeUpdate, message: 'Promo code has been updated' });
                }
                else {
                    res.send({ status: 201, data: {}, message: 'Promo code could not be updated' });
                }
            } else {
                res.send({ status: 201, data: {}, message: 'Promo code not found' })
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async promocodeDelete(req, res) {
        try {
            const promocode_id = new mongoose.Types.ObjectId(req.params.id);
            let promocodeInfo = await Promocode.findOne({ _id: promocode_id });
            if (!_.isEmpty(promocodeInfo) && promocodeInfo._id) {
                let promocodeDelete = await promocodeRepo.delete(promocode_id);
                if (!_.isEmpty(promocodeDelete) && promocodeDelete._id) {
                    res.send({ status: 200, data: promocodeInfo, message: 'Promo code has been removed successfully' });
                }
                else {
                    res.send({ status: 201, data: {}, message: 'Promo code could not be removed' });
                }
            }
            else {
                res.send({ status: 201, data: {}, message: 'Promo Code not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async statusChange(req, res) {
        try {
            const promocode_id = new mongoose.Types.ObjectId(req.params.id);
            let promocodeInfo = await Promocode.findById(promocode_id);
            if (!_.isEmpty(promocodeInfo) && promocodeInfo._id) {
                let statusUpdate = await promocodeRepo.updateById({ 'status': req.body.status }, promocode_id);
                if (!_.isEmpty(statusUpdate) && statusUpdate._id) {
                    res.send({ status: 200, data: statusUpdate, message: 'Promocode status has been updated' })
                }
                else {
                    res.send({ status: 201, data: {}, message: 'Promocode could not be updated' });
                }
            } else {
                res.send({ status: 201, data: {}, message: 'Promocode not found!' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

}

module.exports = new PromocodeController();