const express = require('express');
const router = express.Router();
const Authentication = require('../middleware/authentication');
const multer = require('multer');
const request_param = multer();

module.exports = router;