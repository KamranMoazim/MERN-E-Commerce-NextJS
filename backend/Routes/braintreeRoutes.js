const express = require("express");
const router = express.Router();

const {isAuth, requireSignin} = require("../Controllers/authControllers")
const {findById} = require("../Controllers/userControllers")
const {generateToken, processPayment} = require("../Controllers/braintreeControllers")


router.get("/braintree/getToken/:userId", requireSignin, isAuth, generateToken);
router.post("/braintree/payment/:userId", requireSignin, isAuth, processPayment);

router.param("userId", findById)


module.exports = router;




