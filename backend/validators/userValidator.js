const {check} = require("express-validator")

exports.signupValidator = [
    check("name")
        .not()
        .isEmpty()
        .withMessage("Name is Required!"),
    check("email")
        .isEmail()
        .withMessage("Email must be Valid!")
        .not()
        .isEmpty()
        .withMessage("Email is Required!"),
    check("password")
        .not()
        .isEmpty()
        .withMessage("Password is Required!")
        .isLength({min:6})
        .withMessage("Password must be minimum of 6 characters length!")
        .isAlphanumeric()
        .withMessage("Password must contain both Alphabets and Numbers!"),
]



exports.signinValidator = [
    check("email")
        .isEmail()
        .withMessage("Email must be Valid!")
        .not()
        .isEmpty()
        .withMessage("Email is Required!"),
    check("password")
        .not()
        .isEmpty()
        .withMessage("Password is Required!")
        .isLength({min:6})
        .withMessage("Password must be minimum of 6 characters length!")
        .isAlphanumeric()
        .withMessage("Password must contain both Alphabets and Numbers!"),
]