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

}

module.exports = new languageController();