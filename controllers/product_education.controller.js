const ProductEducation = require('../models/product_education.model');
const AttributeValue = require('../models/attribute_value.model');
const educationRepo = require('../repositories/product_education.repository');
const productRepo = require('../repositories/product.repository');
const attributevalueRepo = require('../repositories/attribute_value.repository');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');

class productEducationController {
    constructor() { }

    async lessonCoursesList(req, res) {
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

            const lesson_courses = await educationRepo.list(req);
            if (!_.isEmpty(lesson_courses)) {
                res.status(200).send({ status: 200, data: lesson_courses.docs, total: lesson_courses.total, limit: lesson_courses.limit, page: lesson_courses.page, pages: lesson_courses.pages, message: 'Lesson & Courses Products fetched Successfully' });
            }
            else {
                res.status(201).send({ status: 201, data: [], message: 'No Products Found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async lessonCourseDetails(req, res) {
        try {
            if (_.has(req.query, 'userId')) {
                const userId = new mongoose.Types.ObjectId(req.query.userId);
                const lesson_course_id = new mongoose.Types.ObjectId(req.params.id);
                let lessonDetails = await educationRepo.getDetails({ _id: lesson_course_id }, userId);
                if (!_.isEmpty(lessonDetails)) {
                    res.status(200).send({ status: 200, data: lessonDetails, message: 'Lesson and Course details fetched successfully' });
                }
                else {
                    res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
                }
            }
            else {
                const lesson_course_id = new mongoose.Types.ObjectId(req.params.id);
                let lessonDetails = await educationRepo.getDetails({ _id: lesson_course_id });
                if (!_.isEmpty(lessonDetails)) {
                    res.status(200).send({ status: 200, data: lessonDetails, message: 'Lesson and Course details fetched successfully' });
                }
                else {
                    res.status(400).send({ status: 400, data: {}, message: 'Product not found' });
                }
            }
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    };

    async lessonCourseUpdate(req, res) {
        try {
            let lesson_course_id = new mongoose.Types.ObjectId(req.params.id);
            let courseInfo = await ProductEducation.findOne({ _id: lesson_course_id });
            if (!_.isEmpty(courseInfo) && courseInfo._id) {

                if (req.files && req.files.length > 0) {
                    for (let i = 0; i < req.files.length; i++) {
                        const element = req.files[i];
                        if (element.fieldname === 'image') {
                            var image = element.path;
                            const uploadResultImage = await cloudinary.v2.uploader.upload(image);
                            req.body.image = uploadResultImage.secure_url;
                        }
                    }
                }

                if (_.has(req.body, 'attributeData') && req.body.attributeData.length > 0) {

                    let attribute_values = [];

                    for (let x = 0; x < req.body.attributeData.length; x++) {

                        let attributeData = await attributevalueRepo.updateByField({ _id: req.body.attributeData[x]._id }, req.body.attributeData[x]);
                        if (!_.isEmpty(attributeData)) {
                            attribute_values.push(attributeData);
                        }
                    }
                }

                let lessoncourseUpdate = await educationRepo.updateById(req.body, lesson_course_id);
                if (!_.isEmpty(lessoncourseUpdate) && lessoncourseUpdate._id) {
                    res.status(200).send({ status: 200, data: lessoncourseUpdate, message: 'Course Updated Successfully' })
                }
                else {
                    res.status(400).send({ status: 400, message: 'Course could not be updated' });
                }
            } else {
                res.status(400).send({ status: 400, message: 'Course not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async lessoncourseproductsBulkUpdate(req, res) {
        try {
            let productsUpdate = await ProductEducation.updateMany({}, { $set: { 'sub_category_id': null } });
            res.status(200).send({ status: 200, data: productsUpdate, message: 'Lesson and Courses Products Updated Successfully' });
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** User Lesson and Course Product Add */
    async LessonCourseProductAdd(req, res) {
        try {
            if (req.files && req.files.length > 0) {
                var photo;
                for (let i = 0; i < req.files.length; i++) {
                    const element = req.files[i];
                    if (element.fieldname === 'image') {
                        photo = element.path;
                        const uploadImage = await cloudinary.v2.uploader.upload(photo);
                        req.body.image = uploadImage.secure_url;
                    }
                }
            }
            req.body.user_id = req.user._id;
            let lessoncoursesData = await ProductEducation.create(req.body);
            if (!_.isEmpty(lessoncoursesData) && lessoncoursesData._id) {

                let attribute_values = [];

                for (let x = 0; x < req.body.attributeData.length; x++) {

                    req.body.attributeData[x].product_id = req.body.product_id;

                    let attributeData = await AttributeValue.create(req.body.attributeData[x]);
                    if (!_.isEmpty(attributeData)) {
                        attribute_values.push(attributeData);
                    }
                }

                let productUpdate = await productRepo.updateProductById({ image: lessoncoursesData.image }, lessoncoursesData.product_id);
                res.status(200).send({ status: 200, data: lessoncoursesData, message: 'Lesson and Course Product Saved Successfully' });
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'Lesson and Course Product could not be added' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

}

module.exports = new productEducationController();