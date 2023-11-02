const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

const checkJwt = {
	verify: (token, res) => {
		return new Promise((resolve, reject) => {
			jsonwebtoken.verify(token, process.env.JWTSECERT, function (err, decoded) {
				if (err) {
					res.status(401).json({ 'status': 401, "message": "You are Unauthorized. Please Login again." })
				} else {
					resolve(decoded);
				}
			})
		})
	}
}

module.exports = checkJwt;