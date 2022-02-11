const express = require("express");
const router = express.Router();

const { create, list, read, remove, categoryId } = require("../Controllers/categoryControllers")
const { requireSignin, isAdmin } = require("../Controllers/authControllers")
const {findById} = require("../Controllers/userControllers");

// validators
const { categoryValidator } = require("../validators/categoryValidator");

router.post("/category/create/:userId", categoryValidator, requireSignin, isAdmin, create);
router.get("/categories", list);
router.get("/category/:categoryId", read);
router.delete("/category/:categoryId", categoryValidator, requireSignin, isAdmin, remove);



router.param("userId", findById)
router.param("categoryId", categoryId)


module.exports = router;