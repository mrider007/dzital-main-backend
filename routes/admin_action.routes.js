const express = require('express');
const adminActionController = require('../controllers/admin_action.controller');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.get('/admin/action/list', adminActionController.list);
router.post('/admin/action/add', request_param.any(), adminActionController.add);
router.post('/admin/action/update/:id', adminActionController.edit);

module.exports = router;