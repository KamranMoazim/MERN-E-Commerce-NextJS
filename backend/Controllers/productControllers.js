const { validationResult } = require("express-validator");
// const slugify = require("slugify")

const Product = require("../Models/productModel")
const {errorHandler} = require("../Utils/dbErrorHandler")



exports.create = (req, res) => {
    // validating
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ error: errors.array()[0].msg })
    }

    // const {name} = req.body;
    console.log(req.body)
    let product = new Product(req.body);
    product.save((err, data)=>{
        if (err) {
            return res.status(400).json({
                error:errorHandler(err)
            }) 
        }
        res.json({data})
    })
}



exports.productById = (req, res, next, id) => {
    Product.findById(id)
        .exec((err, product)=>{
            if(err || !product){
                return res.status(400).json({
                    error:"Product not Found!"
                })
            }
            // console.log(user)
            req.product = product
            next();
        })
}

exports.list = (req, res) => {

    Product.find({}).exec((err, data)=>{
        if (err) {
            return res.status(400).json({
                error:errorHandler(err)
            }) 
        }
        res.json(data)
    })
}

exports.read = (req, res) => {

    return res.json(req.product)
}


exports.remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct)=>{
        if (err) {
            return res.status(400).json({
                error:errorHandler(err)
            }) 
        }
        res.json({
            deletedProduct,
            message:"Product Deleted Successfully!"
        })
    })
}


exports.update = (req, res) => {

    // validating
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ error: errors.array()[0].msg })
    }

    let product = req.product;

    product.update(req.body, (err, updatedProduct)=>{
        if (err) {
            return res.status(400).json({
                error:errorHandler(err)
            }) 
        }
        res.json({
            message:"Product Updated Successfully!"
        })
    })
}