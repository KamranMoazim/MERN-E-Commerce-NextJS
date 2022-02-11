const express = require("express");
const router = express.Router();

const {signup, signin, signout} = require("../Controllers/userControllers");
const { signupValidator, signinValidator } = require("../validators/userValidator");


// routes
router.post("/signup", signupValidator, signup);
router.post("/signin", signinValidator, signin);
router.get("/signout", signout);



module.exports = router;