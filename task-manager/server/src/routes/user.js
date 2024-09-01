const router = require("express").Router();
const userController = require("../controllers/userController");
const registerValidator = require("../validators/register_validator")
const loginValidator = require("../validators/login_validator")
// Route for registering user user
router.post('/register',registerValidator.userValidationRules(), registerValidator.validate, userController.register);

// Route for logging in user user
router.post('/login',loginValidator.userValidationRules(), loginValidator.validate, userController.login);

module.exports = router;