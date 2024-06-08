const express = require('express');
const meetingController = require('../controllers/zoom_meeting.controller');
//const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.post('/create-meeting', request_param.any(), meetingController.createMeeting);

module.exports = router;