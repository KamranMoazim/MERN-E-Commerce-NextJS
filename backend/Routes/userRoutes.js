const express = require("express");
const router = express.Router();

const {requireSignin, isAuth, isAdmin} = require("../Controllers/authControllers");
const {findById} = require("../Controllers/userControllers");


// routes
router.get("/secret/:userId", requireSignin, isAdmin, (req, res)=>{
    res.json({
        user:req.profile
    })
})

router.param("userId", findById)



module.exports = router;