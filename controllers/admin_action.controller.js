const Action = require('../models/admin_action.model');

class adminActionController {
    constructor() { }

    async add(req, res) {
        try {
            req.body.slug = req.body.name.trim().replace(/\s+/g, '-').toLowerCase();
            let actionAdd = await Action.create(req.body);
            if (!_.isEmpty(actionAdd) && actionAdd._id) {
                res.send({ status: 200, data: actionAdd, message: 'Admin Action has been added successfully' });
            }
            else {
                res.send({ status: 400, data: {}, message: 'Admin Action has been added successfully' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async list(req, res) {
        try {
            const actions = await Action.find();
            if (!_.isEmpty(actions)) {
                res.send({ status: 200, data: actions, message: 'All Admin Action for permission' });
            }
            else {
                res.send({ status: 400, data: {}, message: 'No Action found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };
}

module.exports = new adminActionController();