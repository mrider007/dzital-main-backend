const express = require('express');
const Authentication = require('../middleware/authentication');
const roomController = require('../controllers/room.controller');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.post('/room/create', request_param.any(), Authentication.Authenticate, roomController.createRoom);

module.exports = router;