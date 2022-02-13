const express = require("express");
const router = express.Router();

const { create, productById, read, remove, list, update, listRelated, listCategories, listBySearch } = require("../Controllers/productControllers")
const { requireSignin, isAdmin } = require("../Controllers/authControllers")
const {findById} = require("../Controllers/userControllers");

// validators
const { productValidator } = require("../validators/productValidator");





router.post("/product/create/:userId", productValidator, requireSignin, isAdmin, create);
router.put("/product/:productById/:userId", productValidator, requireSignin, isAdmin, update);
router.get("/products", list);
router.get("/products/related/:productById", listRelated);
router.get("/products/categories", listCategories);
router.post("/products/bysearch", listBySearch);
router.get("/product/:productById", read);
router.delete("/product/:productById/:userId", requireSignin, isAdmin, remove);


router.param("userId", findById)
router.param("productById", productById)


module.exports = router;