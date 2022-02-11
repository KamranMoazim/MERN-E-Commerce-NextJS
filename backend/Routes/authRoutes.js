const express = require("express");
const router = express.Router();

const {signup, signin, signout} = require("../Controllers/authControllers");
const { signupValidator, signinValidator } = require("../validators/authValidator");


// routes
router.post("/signup", signupValidator, signup);
router.post("/signin", signinValidator, signin);
router.get("/signout", signout);



module.exports = router;