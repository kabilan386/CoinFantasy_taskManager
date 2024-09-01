const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const secretKey = "Y2FydHJhYmJp";
// This for register user account
exports.register = async (email, password) => {

    try {
        const user = await User.create({
            email: email,
            password : password
        });
        return user;
    } catch (error) {
        throw error; // Propagate the error to the controller
    }
}
// This for login for user account.
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email , password } });
        if (!user) {
            return res.status(401).json({ status: false, message: 'Invalid username or password' });
        }
        // const isPasswordValid = await bcrypt.compare(password, user.password);
        // if (!isPasswordValid) {
        //     return res.status(401).json({ status: false, message: 'Invalid username or password' });
        // }
        const token = jwt.sign({ email: user.email, id: user.id }, secretKey, { expiresIn: '1h' });
        return res.status(200).json({ status: true, message: 'Login successful', token });
    } catch (error) {
        throw error; // Propagate the error to the controller
    }
}