const mongoose = require('mongoose');
const FAQ = require('../models/faq.model');
const faqRepo = require('../repositories/faq.repository');

class faqController {
    constructor() { }

    async faqAdd(req, res) {
        try {
            let faqCheck = await FAQ.findOne({ question: req.body.question });
            if (!_.isEmpty(faqCheck) && faqCheck._id) {
                res.send({ status: 400, data: {}, message: 'FAQ already exists' });
            }
            else {
                let faqSave = await FAQ.create(req.body);
                if (!_.isEmpty(faqSave) && faqSave._id) {
                    res.send({ status: 200, data: faqSave, message: 'FAQ has been saved successfully' });
                } else {
                    res.send({ status: 400, data: {}, message: 'FAQ could not be added' });
                }
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async faqDetails(req, res) {
        try {
            const faq_id = new mongoose.Types.ObjectId(req.params.id);
            const faqInfo = await FAQ.findOne({ _id: faq_id });
            if (!_.isEmpty(faqInfo) && faqInfo._id) {
                res.send({ status: 200, data: faqInfo, message: 'FAQ Details has been fetched successfully' });
            }
            else {
                res.send({ status: 400, message: 'FAQ not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    /** Admin FAQ List */
    async faqList(req, res) {
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

            let faqData = await faqRepo.getFaqList(req);
            if (!_.isEmpty(faqData)) {
                res.send({ status: 200, data: faqData.docs, total: faqData.total, limit: faqData.limit, page: faqData.page, pages: faqData.pages, message: 'FAQ list fetched successfully' });
            }
            else {
                res.send({ status: 201, data: [], message: 'No records found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    /** User FAQ List */
    async getAll(req, res) {
        try {
            if (!req.body.page) {
                req.body.page = 1;
            } else {
                req.body.page = parseInt(req.body.page);
            }

            if (!req.body.limit) {
                req.body.limit = 10
            }
            else {
                req.body.limit = parseInt(req.body.limit);
            }

            let faqData = await faqRepo.getFaqList(req);
            if (!_.isEmpty(faqData)) {
                res.send({ status: 200, data: faqData.docs, total: faqData.total, limit: faqData.limit, page: faqData.page, pages: faqData.pages, message: 'FAQ list fetched successfully' });
            }
            else {
                res.send({ status: 201, data: [], message: 'No records found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async faqUpdate(req, res) {
        try {
            const faq_id = new mongoose.Types.ObjectId(req.params.id);
            let faqInfo = await FAQ.findOne({ _id: faq_id });
            if (!_.isEmpty(faqInfo) && faqInfo._id) {
                let updateData = await faqRepo.updateById(req.body, faq_id);
                if (!_.isEmpty(updateData) && updateData._id) {
                    res.send({ status: 200, data: updateData, message: 'FAQ has been updated successfully' });
                }
                else {
                    res.send({ status: 400, data: {}, message: 'FAQ could not be updated' });
                }
            }
            else {
                res.send({ status: 400, data: {}, message: 'FAQ not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async faqDelete(req, res) {
        try {
            const faq_id = new mongoose.Types.ObjectId(req.params.id);
            const faqInfo = await FAQ.findOne({ _id: faq_id });
            if (!_.isEmpty(faqInfo) && faqInfo._id) {
                let faqDelete = await faqRepo.delete(faq_id);
                if (!_.isEmpty(faqDelete) && faqDelete._id) {
                    res.send({ status: 200, data: faqDelete, message: 'FAQ has been removed successfully' });
                } else {
                    res.send({ status: 400, data: {}, message: 'FAQ could not be deleted' });
                }
            } else {
                res.send({ status: 400, data: {}, message: 'FAQ not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };
}

module.exports = new faqController();