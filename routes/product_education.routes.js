const express = require('express');
const productEducationController = require('../controllers/product_education.controller');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.post('/product/lesson-courses/list', request_param.any(), productEducationController.lessonCoursesList);

module.exports = router;