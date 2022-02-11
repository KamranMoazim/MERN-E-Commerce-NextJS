const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")

const User = require("../Models/userModel")
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