const {Order, CartItem} = require("../Models/cartItemModels")
const {errorHandler} = require("../Utils/dbErrorHandler")


exports.updateOrderStatusValue = (req, res) => {

    Order.updateOne({_id:req.body.orderId}, {$set:{status:req.body.status}}, (err, data)=>{
        if (err) {
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json(data)
    })
}


exports.create = (req, res) => {

    // console.log(req.body)
    req.body.user = req.profile;
    const order = new Order(req.body)
    order.save((err, data)=>{
        if (err) {
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json({data})
    })
}


exports.list = (req, res) => {

    Order.find({})
    .populate("user", "_id name address")
    .sort("-created")
    .exec((err, orders)=>{
        if (err) {
            return res.status(400).json({
                error:errorHandler(err)
            }) 
        }
        res.json(orders)
    })
}



exports.getStatusValues = (req, res) => {

    res.json(Order.schema.path("status").enumValues)
}



exports.findByOrder = (req, res, next, id) => {
    Order.findById(id)
        .populate("products.product", "name price")
        .exec((err, order)=>{
            if(err || !order){
                return res.status(400).json({
                    error:"Order not Found!"
                })
            }
            // console.log(user)
            req.order = order
            next();
        })
}