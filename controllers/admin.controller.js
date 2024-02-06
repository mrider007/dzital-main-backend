const Admin = require('../models/admin.model');
const User = require('../models/user.model');
const Plan = require('../models/membership_plan.model');
const adminRepo = require('../repositories/admin.repository');
const userRepo = require('../repositories/user.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');

class adminController {
    constructor() { }

    async adminRegister(req, res) {
        try {
            if (!_.has(req.body, 'name')) {
                res.status(400).send({ status: 400, message: 'Name is required' });
            }
            else if (!_.has(req.body, 'email')) {
                res.status(400).send({ status: 400, message: 'Email is required' });
            }
            else if (!_.has(req.body, 'password')) {
                res.status(400).send({ status: 400, message: 'Password is required' });
            }
            else {
                const adminExist = await Admin.findOne({ email: req.body.email });
                if (!_.isEmpty(adminExist)) {
                    res.status(400).send({ status: 400, message: 'Admin already exists' });
                }
                else {
                    let password = req.body.password;
                    req.body.password = bcrypt.hashSync(password, 10);
                    let saveAdmin = await Admin.create(req.body);
                    if (!_.isEmpty(saveAdmin) && saveAdmin._id) {
                        const token = jwt.sign({ email: saveAdmin.email, id: saveAdmin._id }, process.env.JWTSECERT, { expiresIn: process.env.JWTTIME });
                        res.status(200).send({ status: 200, token: token, data: saveAdmin, msg: 'Admin Registration Successful' });
                    } else {
                        res.status(400).send({ status: 400, message: 'Admin Registration Unsuccessful' });
                    }
                }
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async adminLogin(req, res) {
        try {
            if (!_.has(req.body, 'email')) {
                res.status(400).send({ status: 400, message: 'Email is required' });
            }
            else if (!_.has(req.body, 'password')) {
                res.status(400).send({ status: 400, message: 'Password is required' });
            }
            else {
                let password = req.body.password;
                let adminInfo = await Admin.findOne({ email: req.body.email });
                if (!_.isEmpty(adminInfo) && adminInfo._id) {
                    let isPasswordMatched = await bcrypt.compareSync(password, adminInfo.password);
                    if (!isPasswordMatched) {
                        res.status(400).json({ status: 400, message: "Password not matched" });
                    } else {
                        let token = jwt.sign({ email: adminInfo.email, id: adminInfo._id }, process.env.JWTSECERT, { expiresIn: process.env.JWTTIME });
                        res.status(200).send({ status: 200, data: adminInfo, token: token, isLoggedIn: true, message: 'Admin Login Successful' });
                    }
                } else {
                    res.status(400).json({ status: 400, isLoggedIn: false, message: 'Email not matched!' });
                }
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async details(req, res) {
        try {
            let adminDetails = await adminRepo.getAdminDetails(req);
            if (!_.isEmpty(adminDetails) && adminDetails._id) {
                res.status(200).send({ status: 200, data: adminDetails, message: 'admin profile details fetched successfully' });
            } else {
                res.status(400).send({ status: 400, message: 'Admin not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** Admin Add */
    async adminAdd(req, res) {
        try {
            let admin = await Admin.findOne({ email: req.body.email });
            if (!_.isEmpty(admin) && admin._id) {
                res.status(400).send({ status: 400, message: 'Admin Already Exists' });
            }
            else {
                let password = req.body.password;
                req.body.password = bcrypt.hashSync(password, 10);

                let saveAdmin = await Admin.create(req.body);
                if (!_.isEmpty(saveAdmin) && saveAdmin._id) {
                    res.status(200).send({ status: 200, data: saveAdmin, message: 'Admin has been added successfully' });
                }
                else {
                    res.status(400).send({ status: 400, data: {}, message: 'Admin could not be added' });
                }
            }
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    };

    /* Sub Admin Details */
    async adminDetails(req, res) {
        try {
            const admin_id = new mongoose.Types.ObjectId(req.params.id);
            let adminInfo = await adminRepo.adminInfo({ _id: admin_id });
            if (!_.isEmpty(adminInfo)) {
                res.status(200).send({ status: 200, data: adminInfo[0], message: 'Admin Details Fetched Successfully' });
            }
            else {
                res.status(400).send({ status: 400, message: 'Admin Not Found' });
            }
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    };

    /* Sub Admin Update */
    async adminUpdate(req, res) {
        try {
            const admin_id = new mongoose.Types.ObjectId(req.params.id);
            let adminInfo = await Admin.findOne({ _id: admin_id });

            if (req.files && req.files.length > 0) {
                const uploadResult = await cloudinary.v2.uploader.upload(req.files[0].path);
                req.body.image = uploadResult.secure_url;
            }
            else {
                req.body.image = adminInfo.image;
            }

            let updateDetails = await adminRepo.updateById(req.body, admin_id);
            if (!_.isEmpty(updateDetails) && updateDetails._id) {
                res.status(200).send({ status: 200, data: updateDetails, message: 'Admin Updated Successfully' });
            } else {
                res.status(400).send({ status: 400, message: 'Admin details could not be updated' });
            }
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    };

    /** Admin List */
    async adminList(req, res) {
        try {
            if (!req.body.page) {
                req.body.page = 1
            }
            else {
                req.body.page = parseInt(req.body.page);
            }

            if (!req.body.limit) {
                req.body.limit = 10
            }
            else {
                req.body.limit = parseInt(req.body.limit);
            }

            let admins = await adminRepo.getAdminsList(req);
            if (!_.isEmpty(admins)) {
                res.status(200).send({ status: 200, data: admins.docs, total: admins.total, limit: admins.limit, page: admins.page, pages: admins.pages, message: 'Admins list fetched successfully' });
            } else {
                res.status(201).send({ status: 201, message: 'No user found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async updateProfile(req, res) {
        try {
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
                res.status(200).send({ status: 200, data: updateDetails, message: 'Admin details has been updated' });
            } else {
                res.status(400).send({ status: 400, message: 'Admin details could not be updated' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async logout(req, res) {
        try {
            let admin_id = req.user._id;
            let adminInfo = await Admin.findById(admin_id);
            if (!_.isEmpty(adminInfo) && adminInfo._id) {
                const payload = { id: admin_id };
                const token = jwt.sign(payload, process.env.JWTSECERT, { expiresIn: 0 });
                res.status(200).send({ status: 200, isLoggedIn: false, message: 'Logout Successfully' });
            }
            else {
                res.status(400).send({ status: 400, message: 'Admin not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async changePassword(req, res) {
        try {
            let adminInfo = await Admin.findById(req.user._id);
            if (!bcrypt.compareSync(req.body.currentPassword, adminInfo.password)) {
                res.status(400).send({ status: 400, message: 'Wrong Current Password' });
            }
            if (!_.isEmpty(adminInfo) && adminInfo._id) {
                req.body.password = adminInfo.generateHash(req.body.newPassword);
                let updatePassword = await adminRepo.updateById(req.body, req.user._id);
                if (!_.isEmpty(updatePassword)) {
                    res.status(200).send({ status: 200, data: updatePassword, message: 'Password has been updated successfully' });
                }
                else {
                    res.status(400).send({ status: 400, message: 'Password could not be updated' });
                }
            } else {
                res.status(400).send({ status: 400, message: 'Admin not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** Admin User List */
    async userList(req, res) {
        try {
            if (!req.body.page) {
                req.body.page = 1;
            } else {
                req.body.page = parseInt(req.body.page);
            }

            if (!req.body.limit) {
                req.body.limit = 25;
            } else {
                req.body.limit = parseInt(req.body.limit);
            }

            let users = await adminRepo.getUsersList(req);
            if (!_.isEmpty(users)) {
                res.status(200).send({ status: 200, data: users.docs, total: users.total, limit: users.limit, page: users.page, pages: users.pages, message: 'Users list fetched successfully' });
            } else {
                res.status(201).send({ status: 201, data: [], message: 'No user found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** Admin Premium Users List */
    async premiumUsersList(req, res) {
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

            let premiumusers = await adminRepo.getPremiumUsers(req);
            if (!_.isEmpty(premiumusers)) {
                res.status(200).send({ status: 200, data: premiumusers.docs, total: premiumusers.total, limit: premiumusers.limit, page: premiumusers.page, pages: premiumusers.pages, message: 'Premium Users List fetched successfully' });
            }
            else {
                res.status(201).send({ status: 201, data: [], message: 'No Premium User found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async nonPremiumUsersList(req, res) {
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

            const nonpremiumusers = await adminRepo.getNonPremiumUsers(req);
            if (!_.isEmpty(nonpremiumusers)) {
                res.status(200).send({ status: 200, data: nonpremiumusers.docs, total: nonpremiumusers.total, limit: nonpremiumusers.limit, page: nonpremiumusers.page, pages: nonpremiumusers.pages, message: 'Non Premium Users List fetched successfully' });
            }
            else {
                res.status(201).send({ status: 201, data: [], message: 'Non Premium Users not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** Admin Active Users List */
    async activeUsersList(req, res) {
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

            const activeusers = await adminRepo.getActiveUsers(req);
            if (!_.isEmpty(activeusers)) {
                res.status(200).send({ status: 200, data: activeusers.docs, total: activeusers.total, limit: activeusers.limit, page: activeusers.page, pages: activeusers.pages, message: 'Active Users List fetched successfully' });
            }
            else {
                res.status(201).send({ status: 201, data: [], message: 'No Active User found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** Admin Inactive Users List */
    async deactivatedUsersList(req, res) {
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

            const deactivatedusers = await adminRepo.getDeactivatedUsers(req);
            if (!_.isEmpty(deactivatedusers)) {
                res.status(200).send({ status: 200, data: deactivatedusers.docs, total: deactivatedusers.total, limit: deactivatedusers.limit, page: deactivatedusers.page, pages: deactivatedusers.pages, message: 'Deactivated Users List fetched successfully' });
            }
            else {
                res.status(201).send({ status: 201, data: [], message: 'No Deactivated User found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** Admin User Add */
    async userAdd(req, res) {
        try {
            let user = await adminRepo.getUserInfo({ email: req.body.email });
            if (!_.isEmpty(user) && user._id) {
                res.status(400).send({ status: 400, data: {}, message: 'User Already Exists' });
            }
            else {
                let password = req.body.password;
                req.body.password = bcrypt.hashSync(password, 10);

                if (req.files && req.files.length > 0) {
                    const uploadResult = await cloudinary.v2.uploader.upload(req.files[0].path);
                    req.body.image = uploadResult.secure_url;
                }

                let planDetails = await Plan.findOne({ amount: 0 });
                req.body.plan_id = planDetails._id;

                let saveUser = await adminRepo.save(req.body);
                if (!_.isEmpty(saveUser) && saveUser._id) {
                    res.status(200).send({ status: 200, data: saveUser, message: 'User has been added successfully' });
                }
                else {
                    res.status(400).send({ status: 400, data: {}, message: 'User could not be added' });
                }
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** Admin User Details */
    async userDetails(req, res) {
        try {
            const user_id = new mongoose.Types.ObjectId(req.params.id);
            let userInfo = await userRepo.getUserInfo({ _id: user_id });
            if (!_.isEmpty(userInfo) && userInfo._id) {
                res.status(200).send({ status: 200, data: userInfo, message: 'user details fetched successfully' });
            } else {
                res.status(400).send({ status: 400, data: {}, message: 'User not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    /** Admin User Delete */
    async userDelete(req, res) {
        try {
            const userId = new mongoose.Types.ObjectId(req.params.id);
            const userInfo = await adminRepo.getUserById(userId);
            if (!_.isEmpty(userInfo) && userInfo._id) {
                let userDelete = await adminRepo.delete(userId);
                if (!_.isEmpty(userDelete) && userDelete._id) {
                    res.status(200).send({ status: 200, data: userDelete, message: 'User has been removed successfully' });
                }
                else {
                    res.status(400).send({ status: 400, data: {}, message: 'User could not be removed' });
                }
            } else {
                res.status(400).send({ status: 400, data: {}, message: 'User not found!' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async userUpdate(req, res) {
        try {
            const userId = new mongoose.Types.ObjectId(req.params.id);
            const userInfo = await adminRepo.getUserById(userId);
            if (!_.isEmpty(userInfo) && userInfo._id) {
                if (req.files && req.files.length > 0) {
                    const uploadResult = await cloudinary.v2.uploader.upload(req.files[0].path);
                    req.body.image = uploadResult.secure_url;
                }
                else {
                    req.body.image = userInfo.image;
                }
                let userUpdate = await userRepo.updateById(req.body, userId);
                if (!_.isEmpty(userUpdate) && userUpdate._id) {
                    res.status(200).send({ status: 200, data: userUpdate, message: 'User details has been updated successfully' });
                }
                else {
                    res.status(400).send({ status: 400, data: {}, message: 'Sorry, unable to update user at this moment!' });
                }
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'User not found!' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };



}

module.exports = new adminController();