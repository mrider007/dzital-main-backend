const User = require('../models/user.model');
const userRepo = require('../repositories/user.repository');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const cloudinary = require('cloudinary');
const nodemailer = require('nodemailer');
const Membership_Plan = require('../models/membership_plan.model');
const axios = require('axios');
class userController {
    constructor() { }

    async registration(req, res) {
        try {
            if (!_.has(req.body, 'name')) {
                res.status(400).send({ status: 400, data: {}, message: 'Name is required' });
            }
            else if (!_.has(req.body, 'email')) {
                res.status(400).send({ status: 400, data: {}, message: 'Email is required' });
            }
            else if (!_.has(req.body, 'password')) {
                res.status(400).send({ status: 400, data: {}, message: 'Password is required' });
            }
            else {
                const userExist = await User.findOne({ email: req.body.email });
                if (!_.isEmpty(userExist)) {
                    res.status(400).send({ status: 400, message: 'User Already Registered' });;
                }
                else {
                    let password = req.body.password;
                    req.body.password = bcrypt.hashSync(password, 10);
                    let freeplan = await Membership_Plan.findOne({ title: 'Free Plan' });
                    req.body.plan_id = freeplan._id;
                    let saveUser = await User.create(req.body);
                    if (!_.isEmpty(saveUser)) {
                        let token = jsonwebtoken.sign({ email: saveUser.email, id: saveUser._id }, process.env.JWTSECERT, { expiresIn: process.env.JWTTIME });
                        res.status(200).send({ status: 200, token: token, data: saveUser, msg: 'User Registration Successful' });
                    }
                    else {
                        res.status(400).send({ status: 400, data: {}, message: 'User Registration Unsuccessful' });
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
                res.status(400).send({ status: 400, data: {}, message: 'Email is required' });
            }
            else if (!_.has(req.body, 'password')) {
                res.status(400).send({ status: 400, data: {}, message: 'Password is required' });
            }
            else {
                let password = req.body.password;
                let userDetails = await User.findOne({ email: req.body.email });

                if (!_.isEmpty(userDetails)) {
                    let isPasswordMatched = await bcrypt.compareSync(password, userDetails.password);
                    if (!isPasswordMatched) {
                        res.status(400).send({ status: 400, data: {}, message: 'Password not matched' });
                    }
                    else {
                        let token = jsonwebtoken.sign({ email: userDetails.email, id: userDetails._id }, process.env.JWTSECERT, { expiresIn: process.env.JWTTIME });
                        res.status(200).send({ status: 200, data: userDetails, token: token, isLoggedIn: true, message: 'Logged in successfully!' });
                    }
                }
                else {
                    res.status(400).send({ status: 400, data: {}, isLoggedIn: false, message: 'User not Registered!' });
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
                res.status(200).send({ status: 200, data: userInfo, message: 'Profile details fetched successfully' });
            }
            else {
                res.status(400).send({ status: 400, message: 'User not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async forgetPassword(req, res) {
        try {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.NODEMAILER_USER,
                    pass: process.env.PASSWORD
                }
            });

            const mailOptions = {
                from: process.env.FROM,
                to: req.body.email,
                subject: "Forget Password",
                html: `<h1>Your Password Reset Link - https://www.abc.com</h1> <br />`,
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    res.status(201).send({ success: true, message: "Password Update Link Sent To Your Email", info })
                    console.log(info.response)
                }
            });
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async updateProfile(req, res) {
        try {
            let userInfo = await User.findById(req.user._id);

            if (req.files && req.files.length > 0) {
                const uploadResult = await cloudinary.v2.uploader.upload(req.files[0].path);
                req.body.image = uploadResult.secure_url;
            }
            else {
                req.body.image = userInfo.image;
            }

            let updateUser = await userRepo.updateById(req.body, req.user._id);
            if (!_.isEmpty(updateUser) && updateUser._id) {
                res.status(200).send({ status: 200, data: updateUser, message: 'Profile details updated successfully' });
            }
            else {
                res.status(400).send({ status: 400, data: {}, message: 'Profile details could not be updated' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async changePassword(req, res) {
        try {
            let userInfo = await User.findById(req.user._id);
            if (!bcrypt.compareSync(req.body.currentPassword, userInfo.password)) {
                res.status(400).send({ status: 400, message: 'Wrong Current Password' });
            }
            req.body.password = userInfo.generateHash(req.body.newPassword);
            let updatePassword = await userRepo.updateById(req.body, req.user._id);
            if (!_.isEmpty(updatePassword)) {
                res.status(200).send({ status: 200, data: updatePassword, message: 'Password updated successfully' });
            }
            else {
                res.status(400).send({ status: 400, message: 'Password could not be updated' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async logout(req, res) {
        try {
            let user_id = req.user._id;
            let userInfo = await User.findById(user_id);
            if (!_.isEmpty(userInfo)) {
                const payload = { id: user_id };
                const token = jsonwebtoken.sign(payload, process.env.JWTSECERT, { expiresIn: 0 });
                res.status(200).send({ status: 200, isLoggedIn: false, message: 'Logout Successfully' });
            } else {
                res.status(400).send({ status: 400, message: 'User not found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async socialSignup(req, res) {
        try {
            let checkUser = await User.findOne({ 'email': req.body.email, 'social_id': req.body.social_id, 'register_type': req.body.register_type });
            if (!_.isEmpty(checkUser) && checkUser._id) {
                if (checkUser.social_id === req.body.social_id) {
                    const payload = { id: checkUser._id };
                    const token = jsonwebtoken.sign(payload, process.env.JWTSECERT, { expiresIn: 86400 });
                    res.status(200).send({ status: 200, data: checkUser, token: token, message: "User have successfully logged in" });
                } else {
                    res.status(400).send({ status: 400, message: 'User already registered' });
                }
            } else {
                req.body.status = 'Active';
                let freeplan = await Membership_Plan.findOne({ title: 'Free Plan' });
                req.body.plan_id = freeplan._id;
                let userData = await User.create(req.body);
                const payload = { id: userData._id };
                const token = jsonwebtoken.sign(payload, process.env.JWTSECERT, { expiresIn: 86400 });
                res.status(200).send({ status: 200, data: userData, token: token, message: "User have successfully registered" });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async userList(req, res) {
        try {
            let allUsers = await User.find();
            if (!_.isEmpty(allUsers)) {
                res.send({ status: 200, data: allUsers, message: 'Users list has been fetched successfully' });
            }
            else {
                res.send({ status: 400, data: {}, message: 'No Users found' });
            }
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async userBioAddressUpdate(req, res) {
        try {
            const userUpdate = await User.updateMany({}, { $set: { bio: '', address: '' } });
            res.status(200).send({ status: 200, data: userUpdate, message: 'User bio added updated successfully' });
        } catch (e) {
            res.status(500).send({ status: 500, message: e.message });
        }
    };

    async fetchAgoraToken(req, res) {
        try {
            const apiUrl = 'https://agora-token-service-example.up.railway.app/fetchToken';

            const requestData = {
                tokenType: 'rtc',
                uid: '13119',
                role: 'publisher',
                channel: 'test',
            };

            const response = await axios.post(apiUrl, requestData, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
          
              // Assuming the response contains the token
              
              const agoraToken = response.data.token;
          
              console.log('Agora Token:', agoraToken);
        } catch (e) {
            res.send({ message: e.message });
        }
    };

}

module.exports = new userController();