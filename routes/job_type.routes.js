const express = require('express');
const JobTypeController = require('../controllers/job_type.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.get('/job/type/list', Authentication.Authenticate, JobTypeController.JobTypes);
router.post('/admin/job/type/add', request_param.any(), Authentication.AuthenticateAdmin, JobTypeController.add);
router.post('/admin/job/type/update/:id', request_param.any(), Authentication.AuthenticateAdmin, JobTypeController.update);
router.post('/admin/job/type/list', request_param.any(), Authentication.AuthenticateAdmin, JobTypeController.list);

module.exports = router;