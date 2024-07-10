const UserProductViewRecord = require('../models/user_view_record.model');

class UserProductViewRecordController {
    constructor() { }

    async saveUserProductViewRecord(req, res) {
        try {
            let saveData = await UserProductViewRecord.create(req.body);
            if (!_.isEmpty(saveData) && saveData._id) {
                res.status(200).send({ status: 200, data: saveData, message: 'User Product View Record Saved Successfully' });
            } else {
                res.status(400).send({ status: 400, message: 'User Product View Record could not be saved' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };
}

module.exports = new UserProductViewRecordController();