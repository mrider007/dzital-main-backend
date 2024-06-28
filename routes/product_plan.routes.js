const express = require('express');
const Authentication = require('../middleware/authentication');
const ProductPlanController = require('../controllers/product_plan.controller');
const router = express.Router();
const multer = require('multer');
const request_param = multer();

router.post('/product/plan/create', request_param.any(), Authentication.Authenticate, ProductPlanController.createPlan);
router.delete('/product/plan/delete/:id', Authentication.Authenticate, ProductPlanController.deletePlan);
router.put('/product/plan/update/:id', Authentication.Authenticate, ProductPlanController.updatePlan);

module.exports = router