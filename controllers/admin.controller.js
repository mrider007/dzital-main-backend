const Admin = require('../models/admin.model');
const adminRepo = require('../repositories/admin.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary');

class adminController {
    constructor() { }

    async adminRegister(req, res) {
        try {
            if (!_.has(req.body, 'name')) {
                res.send({ status: 201, message: 'Name is required' });
            }
            else if (!_.has(req.body, 'email')) {
                res.send({ status: 201, message: 'Email is required' });
            }
            else if (!_.has(req.body, 'password')) {
                res.send({ status: 201, message: 'Password is required' });
            }
            else {
                const adminExist = await Admin.findOne({ email: req.body.email });
                if (!_.isEmpty(adminExist)) {
                    res.send({ status: 201, message: 'Admin already exists' });
                }
                else {
                    let password = req.body.password;
                    req.body.password = bcrypt.hashSync(password, 10);
                    let saveAdmin = await Admin.create(req.body);
                    if (!_.isEmpty(saveAdmin) && saveAdmin._id) {
                        const token = jwt.sign({ email: saveAdmin.email, id: saveAdmin._id }, process.env.JWTSECERT, { expiresIn: process.env.JWTTIME });
                        res.send({ status: 200, token: token, data: saveAdmin, msg: 'Admin Registration Successful' });
                    } else {
                        res.send({ status: 201, message: 'Admin Registration Unsuccessful' });
                    }
                }
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async adminLogin(req, res) {
        try {
            if (!_.has(req.body, 'email')) {
                res.send({ status: 201, message: 'Email is required' });
            }
            else if (!_.has(req.body, 'password')) {
                res.send({ status: 201, message: 'Password is required' });
            }
            else {
                let password = req.body.password;
                let adminInfo = await Admin.findOne({ email: req.body.email });
                if (!_.isEmpty(adminInfo) && adminInfo._id) {
                    let isPasswordMatched = await bcrypt.compareSync(password, adminInfo.password);
                    if (!isPasswordMatched) {
                        res.send({ status: 201, message: 'Password not matched' });
                    } else {
                        let token = jwt.sign({ email: adminInfo.email, id: adminInfo._id }, process.env.JWTSECERT, { expiresIn: process.env.JWTTIME });
                        res.send({ status: 200, data: adminInfo, token: token, isLoggedIn: true, message: 'Admin Login Successful' });
                    }
                } else {
                    res.send({ status: 201, isLoggedIn: false, message: 'Email not matched!' });
                }
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async details(req, res) {
        try {
            let adminDetails = await adminRepo.getAdminDetails(req);
            if (!_.isEmpty(adminDetails) && adminDetails._id) {
                res.send({ status: 200, data: adminDetails, message: 'admin profile details fetched successfully' });
            } else {
                res.send({ status: 201, message: 'Admin not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async updateProfile(req, res) {
        try {
            // if (req.files && req.files.length > 0) {
            //     req.files.forEach(element => {
            //         req.body[element.fieldname] = element.filename;
            //     });
            // }
            let adminInfo = await Admin.findById(req.user._id);

            if (req.files && req.files.length > 0) {
                const uploadResult = await cloudinary.v2.uploader.upload(req.files[0].path);
                req.body.image = uploadResult.secure_url;
            }
            else {
                req.body.image = adminInfo.image;
            }

            let updateDetails = await adminRepo.updateById(req.body, req.user._id);
            if (!_.isEmpty(updateDetails) && updateDetails._id) {
                res.send({ status: 200, data: updateDetails, message: 'Admin details has been updated' });
            } else {
                res.send({ status: 201, message: 'Admin details could not be updated' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async logout(req, res) {
        try {
            let admin_id = req.user._id;
            let adminInfo = await Admin.findById(admin_id);
            if (!_.isEmpty(adminInfo) && adminInfo._id) {
                const payload = { id: admin_id };
                const token = jwt.sign(payload, process.env.JWTSECERT, { expiresIn: 0 });
                res.send({ status: 200, isLoggedIn: false, message: 'Logout Successfully' });
            }
            else {
                res.send({ status: 201, message: 'Admin not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async changePassword(req, res) {
        try {
            let adminInfo = await Admin.findById(req.user._id);
            if (!bcrypt.compareSync(req.body.currentPassword, adminInfo.password)) {
                res.send({ status: 201, message: 'Wrong Current Password' });
            }
            if (!_.isEmpty(adminInfo) && adminInfo._id) {
                req.body.password = adminInfo.generateHash(req.body.newPassword);
                let updatePassword = await adminRepo.updateById(req.body, req.user._id);
                if (!_.isEmpty(updatePassword)) {
                    res.send({ status: 200, data: updatePassword, message: 'Password has been updated successfully' });
                }
                else {
                    res.send({ status: 201, message: 'Password could not be updated' });
                }
            } else {
                res.send({ status: 201, message: 'Admin not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async userList(req, res) {
        try {
            if (!req.body.page) {
                req.body.page = 1;
            } else {
                req.body.page = parseInt(req.body.page);
            }

            if (!req.body.limit) {
                req.body.limit = 10;
            } else {
                req.body.limit = parseInt(req.body.limit);
            }

            let users = await adminRepo.getUsersList(req);
            if (!_.isEmpty(users)) {
                res.send({ status: 200, data: users.docs, total: users.total, limit: users.limit, page: users.page, pages: users.pages, message: 'Users list fetched successfully' });
            } else {
                res.send({ status: 201, message: 'No user found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

}

module.exports = new adminController();