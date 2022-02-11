const express = require("express");
const router = express.Router();


const {hello} = require("../Controllers/testingControllers")

router.get("/hello", hello);

module.exports = router;