const ProductEducation = require('../models/product_education.model');
const educationRepo = require('../repositories/product_education.repository');

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

}

module.exports = new productEducationController();