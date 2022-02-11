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