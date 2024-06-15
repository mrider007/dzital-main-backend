const mongoose = require('mongoose');
const ContactToSupplier = require('../models/contact_to_supplier.model');
const contactsupplierRepo = require('../repositories/contact_to_supplier.repository');

class ContactToSupplierController {
    constructor() { }

    async contactSupplierProductInquiry(req, res) {
        try {
            if (!_.has(req.body, 'productId')) {
                res.status(400).send({ status: 400, message: 'Product Id is Required' });
            }
            else if (!_.has(req.body, 'sellerId')) {
                res.status(400).send({ status: 400, message: 'Seller Id is Required' });
            }
            else if (!_.has(req.body, 'requirements_details')) {
                res.status(400).send({ status: 400, message: 'Requirement Details is Required' });
            }
            else {
                req.body.userId = req.user._id;
                let saveInquiryData = await ContactToSupplier.create(req.body);
                if (!_.isEmpty(saveInquiryData) && saveInquiryData._id) {
                    res.status(200).send({ status: 200, data: saveInquiryData, message: 'Contact To Supplier Information Saved Successfully' });
                }
                else {
                    res.status(400).send({ status: 400, message: 'Contact To Supplier Information could not be saved' });
                }
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async sellerProductInquiryList(req, res) {
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

            let enquiriesList = await contactsupplierRepo.getContactToSupplierList(req);
            if (!_.isEmpty(enquiriesList)) {
                res.status(200).send({ status: 200, data: enquiriesList.docs, total: enquiriesList.total, limit: enquiriesList.limit, page: enquiriesList.page, pages: enquiriesList.pages, message: 'Contact To Supplier Enquiries List' });
            } else {
                res.status(400).send({ status: 400, data: [], message: 'No Contact To Supplier Enquiry Found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async userProductEnquiryList(req, res) {
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

            let enquiriesList = await contactsupplierRepo.getUserOwnContactToSupplierList(req);
            if (!_.isEmpty(enquiriesList)) {
                res.status(200).send({ status: 200, data: enquiriesList.docs, total: enquiriesList.total, limit: enquiriesList.limit, page: enquiriesList.page, pages: enquiriesList.pages, message: 'User Own Contact To Supplier Enquiries List' });
            } else {
                res.status(400).send({ status: 400, data: [], message: 'No Contact To Supplier Enquiry Found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };
}

module.exports = new ContactToSupplierController();