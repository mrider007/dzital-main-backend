const express = require('express');
const JobTypeController = require('../controllers/product_job_type.controller');
const Authentication = require('../middleware/authentication');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.get('/job/type/list', JobTypeController.JobTypes);
router.get('/admin/job/type/details/:id', Authentication.AuthenticateAdmin, JobTypeController.details);
router.get('/admin/job/type/delete/:id', Authentication.AuthenticateAdmin, JobTypeController.delete);
router.post('/admin/job/type/add', request_param.any(), Authentication.AuthenticateAdmin, JobTypeController.add);
router.post('/admin/job/type/update/:id', request_param.any(), Authentication.AuthenticateAdmin, JobTypeController.update);
router.post('/admin/job/type/list', request_param.any(), Authentication.AuthenticateAdmin, JobTypeController.list);

module.exports = router;