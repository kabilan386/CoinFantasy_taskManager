const jwt = require("jsonwebtoken")
const secretKey = "Y2FydHJhYmJp";
const verifyToken = (req, res, next) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];

    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;

        // Verify token
        jwt.verify(req.token, secretKey, (err, authData) => {
            if (err) {
                return res.sendStatus(403).json({ status : false , message : "Invalid authorization token"}); // Forbidden
            } else {
                // If token is valid, save the decoded data in request object
                req.authData = authData;
                next(); // Move to next middleware or route handler
            }
        });
    } else {
        // Forbidden
        return res.sendStatus(403).json({ status : false , message : "Invalid authorization token"});
    }
}

module.exports = verifyToken;