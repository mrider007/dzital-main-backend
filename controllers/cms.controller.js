const mongoose = require('mongoose');
const slug = require('slug');
const CMS = require('../models/cms.model');
const cmsRepo = require('../repositories/cms.repository');

class cmsController {
    constructor() { }

    async cmsAdd(req, res) {
        try {
            let checkCMS = await CMS.findOne({ title: req.body.title });
            if (!_.isEmpty(checkCMS) && checkCMS._id) {
                res.status(400).send({ status: 400, data: {}, message: 'CMS Already Exists' });
            }
            else {
                if (!_.has(req.body, 'title')) {
                    res.status(400).send({ status: 400, message: 'Title is required' });
                }
                else {
                    req.body.slug = slug(req.body.title, { lower: true, replacement: '-', trim: true });
                    let cmsSave = await CMS.create(req.body);
                    if (!_.isEmpty(cmsSave) && cmsSave._id) {
                        res.status(200).send({ status: 200, data: cmsSave, message: 'CMS saved successfully' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'CMS could not be added' });
                    }
                }
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    /** Admin CMS Details */
    async getDetails(req, res) {
        try {
            const cmsId = new mongoose.Types.ObjectId(req.params.id);
            const cmsInfo = await CMS.findById(cmsId);
            if (!_.isEmpty(cmsInfo) && cmsInfo._id) {
                res.status(200).send({ status: 200, data: cmsInfo, message: 'CMS Details has been fetched' });
            } else {
                res.status(400).send({ status: 400, data: {}, message: 'CMS not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    /** User CMS Details */
    async cmsDetails(req, res) {
        try {
            let cmsDetails = await CMS.findOne({ slug: req.body.slug });
            if (!_.isEmpty(cmsDetails) && cmsDetails._id) {
                res.status(200).send({ status: 200, data: cmsDetails, message: 'CMS Details fetched successfully' });
            } else {
                res.status(400).send({ status: 400, data: {}, message: 'CMS not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async cmsUpdate(req, res) {
        try {
            const cmsId = new mongoose.Types.ObjectId(req.params.id);
            let cmsDetails = await CMS.findOne({ _id: cmsId });
            if (!_.isEmpty(cmsDetails) && cmsDetails._id) {
                let cmsUpdate = await cmsRepo.updateById(req.body, cmsId);
                if (!_.isEmpty(cmsUpdate) && cmsUpdate._id) {
                    res.status(200).send({ status: 200, data: cmsUpdate, message: 'CMS has been updated successfully' });
                }
                else {
                    res.status(400).send({ status: 400, data: {}, message: 'CMS could not be updated' });
                }
            } else {
                res.status(400).send({ status: 400, data: {}, message: 'CMS not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async cmsDelete(req, res) {
        try {
            const cmsId = new mongoose.Types.ObjectId(req.params.id);
            let cmsInfo = await CMS.findOne({ _id: cmsId });
            if (!_.isEmpty(cmsInfo) && cmsInfo._id) {
                let cmsDelete = await cmsRepo.delete(cmsId);
                if (!_.isEmpty(cmsDelete) && cmsDelete._id) {
                    res.status(200).send({ status: 200, data: cmsDelete, message: 'CMS has been removed successfully' });
                }
                else {
                    res.status(400).send({ status: 400, data: {}, message: 'CMS could not be removed' });
                }
            } else {
                res.status(400).send({ status: 400, data: {}, message: 'CMS not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async changeStatus(req, res) {
        try {
            const cmsId = new mongoose.Types.ObjectId(req.params.id);
            let cmsInfo = await CMS.findById(cmsId);
            if (!_.isEmpty(cmsInfo) && cmsInfo._id) {
                let updateData = await cmsRepo.updateById(req.body, cmsId);
                if (!_.isEmpty(updateData) && updateData._id) {
                    res.status(200).send({ status: 200, data: updateData, message: 'CMS status has been updated successfully' });
                }
                else {
                    res.status(400).send({ status: 400, data: {}, message: 'CMS status could not be updated' });
                }
            } else {
                res.status(400).send({ status: 400, data: {}, message: 'CMS not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    /** Admin CMS List */
    async cmsList(req, res) {
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

            let cmsList = await cmsRepo.getCMSList(req);
            if (!_.isEmpty(cmsList)) {
                res.status(200).send({ status: 200, data: cmsList.docs, total: cmsList.total, limit: cmsList.limit, page: cmsList.page, pages: cmsList.pages, message: 'CMS list fetched successfully' });
            } else {
                res.status(400).send({ status: 400, data: [], message: 'CMS not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    /** User CMS List */
    async getAllCms(req, res) {
        try {
            let cmsList = await cmsRepo.getCMS(req);
            if (!_.isEmpty(cmsList)) {
                res.status(200).send({ status: 200, data: cmsList, message: 'CMS list fetched successfully' });
            } else {
                res.status(400).send({ status: 400, data: [], message: 'No CMS found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

}

module.exports = new cmsController();