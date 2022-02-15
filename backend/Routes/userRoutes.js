const express = require("express");
const router = express.Router();

const {requireSignin, isAuth, isAdmin} = require("../Controllers/authControllers");
const {findById, read, update, getHistory} = require("../Controllers/userControllers");


// routes
// router.get("/secret/:userId", requireSignin, isAdmin, (req, res)=>{
//     res.json({
//         user:req.profile
//     })
// })

router.get("/user/:userId", requireSignin, isAuth, read)
router.put("/user/:userId", requireSignin, isAuth, update)
router.get("/orders/by/user/:userId", requireSignin, isAuth, getHistory)

router.param("userId", findById)



module.exports = router;