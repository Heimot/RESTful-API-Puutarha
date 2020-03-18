const jwt = require('jsonwebtoken');
const role = require('./roles');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        if (role[decoded.roles].find(function (url) {
            if(req.originalUrl.includes("tables")) {

                return url === req.originalUrl.split("?")[0];

            } else if (req.originalUrl.includes("/id/")) {
                
                return url === req.originalUrl.substring(0, req.originalUrl.indexOf("/id/")) + "/id/";

            } else {

            return url === req.originalUrl
            }

        })) {
            req.userData = decoded;
            next();
        } else
        return res.status(401).send('Access Denied: You dont have correct privilege to perform this operation');
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};