const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")

const User = require("../Models/authModel")
const {errorHandler} = require("../Utils/dbErrorHandler")
const { validationResult } = require("express-validator");

exports.signup = (req, res) => {

    // validating
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ error: errors.array()[0].msg })
    }

    const user = new User(req.body)
    user.save((err, user)=>{
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        user.salt=undefined
        user.hashed_password=undefined
        res.json({
            user
        })
    })
}



exports.signin = (req, res) => {

    // validating
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ error: errors.array()[0].msg })
    }

    const {email, password} = req.body

    User.findOne({email}, (err, user)=>{

        if(err || !user){
            return res.status(400).json({
                error:"User with given Email do not exist. Please Signup!"
            })
        }
        // authenticate user
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error:"Email and Password do not match!"
            })
        }
        // generate a token and send to client
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn:"1d"})
        res.cookie("token", token, {expiresIn:"1d"});
        const {_id, name, email, role} = user;
        return res.json({
            token,
            user: {_id, name, email, role}
        });
    })
}

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({message:"Signout Successfully!"})
}


exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
    userProperty:"auth"
})




exports.isAuth = (req, res, next) => {
console.log(req.auth)
    let user = req.profile && req.auth && req.profile._id == req.auth._id;

    if (!user) {
        return res.status(403).json({
            error:"Access Denied!"
        })
    }
    
    next();
}

exports.isAdmin = (req, res, next) => {

    let user = req.profile && req.auth;

    if (!user) {
        return res.status(403).json({
            error:"Access Denied!"
        })
    }
    if (user.role === 1) {
        return res.status(400).json({
            error:"Admin Resource, Access Denied!"
        })
    }
    next();
}
