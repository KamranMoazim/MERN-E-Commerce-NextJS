const express = require("express");
const router = express.Router();

const {isAuth, requireSignin, isAdmin} = require("../Controllers/authControllers")
const {findById, addOrderToUserHistory} = require("../Controllers/userControllers")
const {descreaseQuantity} = require("../Controllers/productControllers")
const {create, list, getStatusValues, updateOrderStatusValue, findByOrder} = require("../Controllers/orderControllers")


router.post("/order/create/:userId", requireSignin, isAuth, addOrderToUserHistory, descreaseQuantity, create);
router.get("/order/list/:userId", requireSignin, isAdmin, list);
router.get("/order/status-values/:userId", requireSignin, isAdmin, getStatusValues);
router.put("/order/:orderId/status/:userId", requireSignin, isAdmin, updateOrderStatusValue);

router.param("userId", findById)
router.param("orderId", findByOrder)


module.exports = router;




