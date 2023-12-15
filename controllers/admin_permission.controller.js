const Permission = require('../models/admin_permission.model');

class permissionController {
    constructor() { }

    async add(req, res) {
        try {

        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };
}

module.exports = new permissionController();