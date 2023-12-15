const express = require('express');
const permissionController = require('../controllers/admin_permission.controller');
const Authentication = require('../middleware/authentication');
const multer = require('multer');
const request_param = multer();
const router = express.Router();



module.exports = router;