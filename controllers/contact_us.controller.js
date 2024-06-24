const mongoose = require('mongoose');
const ContactUs = require('../models/contact_us.model');
const contactusRepo = require('../repositories/contact_us.repository');

class ContactUsController {
    constructor() { }

    async contactUsMessageSave(req, res) {
        try {
            let contactusData = await ContactUs.create(req.body);
            if (!_.isEmpty(contactusData) && contactusData._id) {
                res.status(200).send({ status: 200, data: contactusData, message: 'Contact Us Message Saved Successfully' });
            } else {
                res.status(400).send({ message: 'Contact Us Message could not be saved' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async adminContactUsList(req, res) {
        try {
            let contactusData = await contactusRepo.List(req);
            if (!_.isEmpty(contactusData)) {
                res.status(200).send({ status: 200, data: contactusData.docs, total: contactusData.total, limit: contactusData.limit, page: contactusData.page, pages: contactusData.pages, message: 'Contact Us List' });
            } else {
                res.status(400).send({ status: 400, data: [], message: 'No Record Found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

}

module.exports = new ContactUsController();