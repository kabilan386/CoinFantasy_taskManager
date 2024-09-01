const { User } = require('../models');
const userService = require("../services/userService")


// Controller function for registering a user
exports.register = async (req, res) => {
    // Extract email and password from request body
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (user) {
        return res.status(409).json({
            status: false,
            message: "Email already exists"
        })
    }

    

    try {
        // Call registerUser function from userService
        const newUser = await userService.register( email, password );

        // Respond with success message or new user data
        return res.status(201).json({ status: true, message: 'Registration successful', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error.message);

        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({ status : false , error: error.message });
        }

        // Handle Mongoose duplicate key error (E11000)
        if (error.code === 11000) {
            return res.status(400).json({ status : false , error: 'Email already exists' });
        }   

        // Handle other Mongoose errors
        return res.status(500).json({ status : false , error: 'Registration failed' });
    }
}
// This function for user login
exports.login = async (req, res) => {
    try {
        await userService.login(req, res);     
    } catch (error) {
        return res.status(500).json({ status : false , error: error.message });
    }
}