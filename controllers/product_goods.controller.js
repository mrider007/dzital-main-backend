const mongoose = require('mongoose');
const ProductGoods = require('../models/product_goods.model');
const AttributeValue = require('../models/attribute_value.model');
const goodsRepo = require('../repositories/product_goods.repository');
const productRepo = require('../repositories/product.repository');
const cloudinary = require('cloudinary');

class productGoodsController {
    constructor() { }

    /** User Goods Product Create */
    async GoodsProductCreate(req, res) {
        try {
            if (req.files && req.files.length > 0) {

                var photo, image_1, image_2, image_3;

                for (let i = 0; i < req.files.length; i++) {
                    const element = req.files[i];
                    if (element.fieldname === 'photo') {
                        photo = element.path;
                        const uploadResultLogo = await cloudinary.v2.uploader.upload(photo);
                        req.body.photo = uploadResultLogo.secure_url;
                    }
                    if (element.fieldname === 'image_1') {
                        image_1 = element.path;
                        const uploadResultFaviconLogo = await cloudinary.v2.uploader.upload(image_1);
                        req.body.image_1 = uploadResultFaviconLogo.secure_url;
                    }
                    if (element.fieldname === 'image_2') {
                        image_2 = element.path;
                        const uploadResultFaviconLogo = await cloudinary.v2.uploader.upload(image_2);
                        req.body.image_2 = uploadResultFaviconLogo.secure_url;
                    }
                    if (element.fieldname === 'image_3') {
                        image_3 = element.path;
                        const uploadResultFaviconLogo = await cloudinary.v2.uploader.upload(image_3);
                        req.body.image_3 = uploadResultFaviconLogo.secure_url;
                    }
                }
            }
            req.body.user_id = req.user._id;
            let goodsProductSave = await ProductGoods.create(req.body);
            if (!_.isEmpty(goodsProductSave) && goodsProductSave._id) {

                let attribute_values = [];

                for (let x = 0; x < req.body.attributeData.length; x++) {

                    req.body.attributeData[x].product_id = req.body.product_id;

                    let attributeData = await AttributeValue.create(req.body.attributeData[x]);
                    if (!_.isEmpty(attributeData)) {
                        attribute_values.push(attributeData);
                    }
                }

                let productUpdate = await productRepo.updateProductById({ image: goodsProductSave.photo }, goodsProductSave.product_id);
                res.status(200).send({ status: 200, data: goodsProductSave, message: 'Goods Product Added Successfully' });
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'Goods Product could not be added' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async list(req, res) {
        try {
            if (!req.body.page) {
                req.body.page = 1;
            }
            else {
                req.body.page = parseInt(req.body.page);
            }

            if (!req.body.limit) {
                req.body.limit = 10;
            }
            else {
                req.body.limit = parseInt(req.body.limit);
            }

            const goods = await goodsRepo.List(req);
            if (!_.isEmpty(goods)) {
                res.status(200).send({ status: 200, data: goods.docs, total: goods.total, limit: goods.limit, page: goods.page, pages: goods.pages, message: 'Goods of all kinds Products fetched successfully' });
            }
            else {
                res.status(201).send({ status: 201, data: [], message: 'No Products found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async details(req, res) {
        try {
            const goods_id = new mongoose.Types.ObjectId(req.params.id);
            let goodsInfo = await goodsRepo.getDetails({ _id: goods_id });
            if (!_.isEmpty(goodsInfo) && goodsInfo._id) {
                res.status(200).send({ status: 200, data: goodsInfo, message: 'Product details has been fetched successfully' });
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async GoodsProductsBulkUpdate(req, res) {
        try {
            let productsUpdate = await ProductGoods.updateMany({}, { $set: { 'sub_category_id': null } });
            res.status(200).send({ status: 200, data: productsUpdate, message: 'Goods of all kinds Products Updated Successfully' });
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

}

module.exports = new productGoodsController();