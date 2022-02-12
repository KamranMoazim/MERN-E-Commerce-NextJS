const User = require("../Models/authModel")



exports.findById = (req, res, next, id) => {
    User.findById(id)
        .exec((err, user)=>{
            if(err || !user){
                return res.status(400).json({
                    error:"USER not Found!"
                })
            }
            // console.log(user)
            req.profile = user
            next();
        })
}


exports.read = (req, res, id) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile)
}


exports.update = (req, res, id) => {
    User.findOne({_id:req.profile._id}, {$set:req.body}, {new:true}, (err, user)=>{
        if(err){
            return res.status(400).json({
                error:"You are not Authorized to perform this Action!"
            })
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        return res.json(user)
    })
}