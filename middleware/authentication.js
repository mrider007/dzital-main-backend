require('dotenv').config();
const jwtToken = require('../services/jwt');
const UserModel = require('../models/user.model');
const AdminModel = require('../models/admin.model');

const checkAuth = {

    Authenticate: async function (req, res, next) {
        const tokens = req.headers.token || req.query.token;
        if (tokens) {
            const checktoken = await jwtToken.verify(tokens, res);
            let checkUser = await UserModel.findOne({ _id: checktoken.id });
            if (checkUser != null) {
                req.user = checkUser;
                next();
            } else {
                res.status(401).json({ 'status': 401, "message": "You are Unauthorized. Please Login again." })
            }
        } else {
            res.status(401).json({ 'status': 401, "message": "You are Unauthorized. Please Login again." })
        }
    },

    AuthenticateAdmin: async function (req, res, next) {
        const tokens = req.headers.token || req.query.token;
        if (tokens) {
            const checktoken = await jwtToken.verify(tokens, res);
            let checkAdmin = await AdminModel.findOne({ _id: checktoken.id });
            if (checkAdmin != null) {
                req.user = checkAdmin;
                next();
            } else {
                res.status(401).json({ 'status': 401, "message": "You are Unauthorized. Please Login with correct credentials." })
            }
        } else {
            res.status(401).json({ 'status': 401, "message": "You are Unauthorized. Please Login with correct credentials." })
        }
    }
}

module.exports = checkAuth;