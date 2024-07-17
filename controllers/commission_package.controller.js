const commission_package = require("../models/commission_package.model");
const CommissionPackageRepo = require("../repositories/commission_package.repository");

class CommissionPackageController {

    async create(req, res) {
        try {
            const saveCommission = await commission_package.create(req.body)
            if (_.isEmpty(saveCommission) || !saveCommission._id) {
                res.status(400).send({ status: 400, message: 'Commission Package could not be saved' });
            } else {
                res.status(200).send({ status: 200, data: saveCommission, message: 'Commission Package saved successfully' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    }

    async fetch_all(req, res) {
        try {
            const commission_packages = await CommissionPackageRepo.getAll(req)
            if (_.isEmpty(commission_packages) || commission_packages.length === 0) {
                res.status(201).send({ status: 201, data: [], message: 'No Commission Package Found' });
            } else {
                res.status(200).send({ status: 200, data: commission_packages, message: 'Commission Package Found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    }

    async update_package(req, res) {
        try {
            const updatedPackage = await CommissionPackageRepo.updateOne({ _id: req.params.id }, req.body);
            if (_.isEmpty(updatedPackage) || !updatedPackage._id) {
                res.status(404).send({ status: 404, message: 'Package can not be updated' });
            } else {
                res.status(200).send({ status: 200, data: updatedPackage, message: 'Package Updated Successfully' });
            }
        } catch (error) {
            res.status(500).send({ status: 500, message: error?.message })
        }
    }
}

module.exports = new CommissionPackageController();