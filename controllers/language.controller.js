const mongoose = require('mongoose');
const Language = require('../models/language.model');

class languageController {
    constructor() { }

    async add(req, res) {
        try {
            let saveData = await Language.create(req.body);
            if (!_.isEmpty(saveData) && saveData._id) {
                res.status(200).send({ status: 200, data: saveData, message: 'Language has been added successfully' });
            } else {
                res.status(400).send({ status: 400, data: {}, message: 'Language could not be added' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async details(req, res) {
        try {
            const language_id = new mongoose.Types.ObjectId(req.params.id);
            let languageInfo = await Language.findOne({ _id: language_id });
            if (!_.isEmpty(languageInfo) && languageInfo._id) {
                res.status(200).send({ status: 200, data: languageInfo, message: 'Language details has been fetched successfully' });                
            } else {
                res.status(400).send({ status: 400, data: {}, message: 'Language not found' });
            }      
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

}

module.exports = new languageController();