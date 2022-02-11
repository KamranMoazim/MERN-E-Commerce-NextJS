const { check } = require("express-validator");

exports.productValidator = [
    check("name")
        .not()
        .isEmpty()
        .withMessage("Name is Required."),
    check("description")
        .not()
        .isEmpty()
        .withMessage("Description is Required."),
    check("price")
        .not()
        .isEmpty()
        .withMessage("Price is Required."),
    check("quantity")
        .not()
        .isEmpty()
        .withMessage("Price is Required."),
    check("photoPath")
        .not()
        .isEmpty()
        .withMessage("Photo is Required.")
]