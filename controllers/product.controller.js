const Product = require('../models/product.model');

class productController {
    constructor() { }

    async productAdd(req, res) {
        try {
            if (req.files && req.files.length > 0) {
                req.files.forEach(element => {
                    req.body[element.fieldname] = element.filename;
                });
            }
            let productSave = await Product.create(req.body);
            if (!_.isEmpty(productSave) && productSave._id) {
                res.send({ status: 200, data: productSave, message: 'Product saved successfully' });
            } else {
                res.send({ status: 201, data: {}, message: 'Product could not be added' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async productList(req, res) {
        try {
            let products = await Product.find();
            if (!_.isEmpty(products)) {
                res.send({ status: 200, data: products, message: 'Products list fetched successfully' });
            } else {
                res.send({ status: 201, data: [], message: 'No products found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };
}

module.exports = new productController();