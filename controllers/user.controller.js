const User = require('../models/user.model');
const userRepo = require('../repositories/user.repository');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

class userController {
    constructor() { }

    async registration(req, res) {
        try {
            if (!_.has(req.body, 'name')) {
                res.send({ status: 201, data: {}, message: 'Name is required' });
            }
            else if (!_.has(req.body, 'email')) {
                res.send({ status: 201, data: {}, message: 'Email is required' });
            }
            else if (!_.has(req.body, 'password')) {
                res.send({ status: 201, data: {}, message: 'Password is required' });
            }
            else {
                const userExist = await User.findOne({ email: req.body.email });
                if (!_.isEmpty(userExist)) {
                    res.send({ status: 201, message: 'User Already Registered' });;
                }
                else {
                    let password = req.body.password;
                    req.body.password = bcrypt.hashSync(password, 10);
                    let saveUser = await User.create(req.body);
                    if (!_.isEmpty(saveUser)) {
                        let token = jsonwebtoken.sign({ email: saveUser.email, id: saveUser._id }, process.env.JWTSECERT, { expiresIn: process.env.JWTTIME });
                        res.send({ status: 200, token: token, data: saveUser, msg: 'User Registration Successful' });
                    }
                    else {
                        res.send({ status: 201, data: {}, message: 'User Registration Unsuccessful' });
                    }
                }
            }
        } catch (err) {
            return { status: 500, message: err.message };
        }
    };

    async login(req, res) {
        try {
            if (!_.has(req.body, 'email')) {
                res.send({ status: 201, data: {}, message: 'Email is required' });
            }
            else if (!_.has(req.body, 'password')) {
                res.send({ status: 201, data: {}, message: 'Password is required' });
            }
            else {
                let password = req.body.password;
                let userDetails = await User.findOne({ email: req.body.email });

                if (!_.isEmpty(userDetails)) {
                    let isPasswordMatched = await bcrypt.compareSync(password, userDetails.password);
                    if (!isPasswordMatched) {
                        res.send({ status: 201, data: {}, message: 'Password not matched' });
                    }
                    else {
                        let token = jsonwebtoken.sign({ email: userDetails.email, id: userDetails._id }, process.env.JWTSECERT, { expiresIn: process.env.JWTTIME });
                        res.send({ status: 200, data: userDetails, token: token, isLoggedIn: true, message: 'Logged in successfully!' });
                    }
                }
                else {
                    res.send({ status: 201, data: {}, isLoggedIn: false, message: 'User not Registered!' });
                }
            }
        } catch (err) {
            return { status: 500, message: err.message };
        }
    };

    async profileDetails(req, res) {
        try {
            let userInfo = await userRepo.getUserDetails(req);
            if (!_.isEmpty(userInfo) && userInfo._id) {
                res.send({ status: 200, data: userInfo, message: 'Profile details fetched successfully' });
            }
            else {
                res.send({ status: 201, message: 'User not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async updateProfile(req, res) {
        try {
            console.log('req', req.files);
            if (req.files && req.files.length > 0) {
                req.files.forEach(element => {
                    req.body[element.fieldname] = element.filename;
                });
            }
            let updateUser = await userRepo.updateById(req.body, req.user._id);
            if (!_.isEmpty(updateUser) && updateUser._id) {
                res.send({ status: 200, data: updateUser, message: 'Profile details updated successfully' });
            }
            else {
                res.send({ status: 201, data: {}, message: 'Profile details could not be updated' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async changePassword(req, res) {
        try {
            let userInfo = await User.findById(req.user._id);
            if (!bcrypt.compareSync(req.body.currentPassword, userInfo.password)) {
                res.send({ status: 201, message: 'Wrong Current Password' });
            }
            req.body.password = userInfo.generateHash(req.body.newPassword);
            let updatePassword = await userRepo.updateById(req.body, req.user._id);
            if (!_.isEmpty(updatePassword)) {
                res.send({ status: 200, data: updatePassword, message: 'Password updated successfully' });
            }
            else {
                res.send({ status: 201, message: 'Password could not be updated' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async logout(req, res) {
        try {
            let user_id = req.user._id;
            let userInfo = await User.findById(user_id);
            if (!_.isEmpty(userInfo)) {
                const payload = { id: user_id };
                const token = jsonwebtoken.sign(payload, process.env.JWTSECERT, { expiresIn: 0 });
                res.send({ status: 200, isLoggedIn: false, message: 'Logout Successfully' });
            } else {
                res.send({ status: 201, message: 'User not found' });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

    async socialSignup(req, res) {
        try {
            let checkUser = await User.findOne({ 'email': req.body.email, 'social_id': req.body.social_id, 'register_type': req.body.register_type });
            if (!_.isEmpty(checkUser) && checkUser._id) {
                if (checkUser.social_id === req.body.social_id) {
                    const payload = { id: checkUser._id };
                    const token = jsonwebtoken.sign(payload, process.env.JWTSECERT, { expiresIn: 86400 });
                    res.send({ status: 200, data: checkUser, token: token, message: "User have successfully logged in" });
                } else {
                    res.send({ status: 201, message: 'User already registered' });
                }
            } else {
                let userData = await User.create(req.body);
                const payload = { id: userData._id };
                const token = jsonwebtoken.sign(payload, process.env.JWTSECERT, { expiresIn: 86400 });
                res.send({ status: 200, data: userData, token: token, message: "User have successfully registered" });
            }
        } catch (e) {
            res.send({ status: 500, message: e.message });
        }
    };

}

module.exports = new userController();