const { validationResult } = require("express-validator");
// const slugify = require("slugify")

const Product = require("../Models/productModel")
const {errorHandler} = require("../Utils/dbErrorHandler")



exports.descreaseQuantity = (req, res, next) => {
    // console.log(req.body)
    let bulkOps = req.body.products.map((item)=>{
        return {
            updateOne: {
                filter: {_id:item._id},
                update: {$inc: {quantity:-item.count, sold:+item.count}}
            }
        }
    })
    Product.bulkWrite(bulkOps, {}, (err, products)=>{
        if (err) {
            return res.status(400).json({
                error:"Could not update Product!"
            })
        }
        next()
    })
}

exports.create = (req, res) => {
    // validating
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ error: errors.array()[0].msg })
    }

    // const {name} = req.body;
    // console.log(req.body)
    let product = new Product(req.body);
    product.save((err, data)=>{
        if (err) {
            return res.status(400).json({
                error:errorHandler(err)
            }) 
        }
        res.json({data, message:"Product Created Successfully!"})
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
            req.product = product
            next();
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



/**
 * sell / arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by sell = /products?sortBy=createdAt&order=asc&limit=10
 * if no params are sent then all products are returned
 */

 exports.list = (req, res) => {

    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "sold";
    let limit = req.query.limit ? parseInt(req.query.limit) : 10

    Product.find({})
        // .select("-photoPath")
        .populate("category")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products)=>{
            if (err) {
                return res.status(400).json({
                    error:errorHandler(err)
                }) 
            }
            // console.log(products)
            res.json(products)
        })
}


exports.listSearch = (req, res) => {

    const query = {}

    if (req.query.search) {  // name:req.query.search, category:req.query.category
        query.name = {$regex:req.query.search ,$options:"i"}
        if (req.query.category && req.query.category != "All") {
            query.category = req.query.category
        }
    }

    Product.find(query)
        .populate("category")
        .exec((err, products)=>{
            if (err) {
                return res.status(400).json({
                    error:errorHandler(err)
                }) 
            }
            // console.log(products)
            res.json(products)
        })

}


/**
 * it will find the product based on the req product category
 * other products that has the same category
 */

exports.listRelated = (req, res) => {

    let limit = req.query.limit ? parseInt(req.query.limit) : 5

    Product.find({_id: {$ne:req.product}, category:req.product.category})
        .populate("category", "_id name")
        .limit(limit)
        .exec((err, products)=>{
            if (err) {
                return res.status(400).json({
                    error:errorHandler(err)
                }) 
            }
            res.json(products)
        })
}


exports.listCategories = (req, res) => {

    Product.distinct("category", {}, (err, categories)=>{
        if (err) {
            return res.status(400).json({
                error:errorHandler(err)
            }) 
        }
        res.json(categories)
    })
}

/**
 * lists products by search
 */

exports.listBySearch = (req, res) => {
    // console.log(req.query)
    // console.log(req.body)
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "sold";
    let limit = req.body.limit ? parseInt(req.body.limit) : 10
    let skip = parseInt(req.body.skip)
    let findArgs = { }

    for (let key in req.body.filters) {
        if (req.body.filters[key].length>0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key]
            }
            
        }
    }

    Product.find(findArgs)
        // .select("-photoPath")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, products)=>{
            if (err) {
                return res.status(400).json({
                    error:errorHandler(err)
                }) 
            }
            res.json({
                products,
                size:products.length
            })
        })
}
