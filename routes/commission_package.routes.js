const CommissionPackageController = require('../controllers/commission_package.controller');
const Authentication = require('../middleware/authentication');
const express = require('express');
const router = express.Router()

router.post('/commission-package/create', Authentication.AuthenticateAdmin, CommissionPackageController.create)
router.put('/commission-package/update/:id', Authentication.AuthenticateAdmin, CommissionPackageController.update_package)
router.post('/commission-package/get-all', Authentication.AuthenticateAdmin, CommissionPackageController.fetch_all)

module.exports = router;