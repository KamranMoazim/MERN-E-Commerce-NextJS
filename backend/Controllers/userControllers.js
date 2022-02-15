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

exports.addOrderToUserHistory = (req, res, next) => {
    let history = [];
    // console.log(req.body)
    req.body.products.forEach(item => {
        history.push({
            _id:item._id,
            name:item.name,
            description:item.description,
            category:item.category,
            quantity:item.count,
            transaction_id:req.body.transaction_id,
            amount:req.body.amount
        })
    });

    User.findOneAndUpdate({_id:req.profile._id}, {$push: {history:history}}, {new:true}, (err, data)=>{
        if (err) {
            return res.status(400).json({
                error:"Could not update your Purhcase history!"
            })
        }
        next()
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