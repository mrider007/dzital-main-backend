const mongoose = require('mongoose');
const ContactUs = require('../models/contact_us.model');

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
}

module.exports = new ContactUsController();