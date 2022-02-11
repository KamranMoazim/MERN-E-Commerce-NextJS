const { validationResult } = require("express-validator");
// const slugify = require("slugify")

const Category = require("../Models/categoryModel")
const {errorHandler} = require("../Utils/dbErrorHandler")



exports.create = (req, res) => {
    // validating
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ error: errors.array()[0].msg })
    }

    const {name} = req.body;
    let category = new Category({name});
    category.save((err, data)=>{
        if (err) {
            return res.status(400).json({
                error:errorHandler(err)
            }) 
        }
        res.json({data})
    })
}


exports.list = (req, res) => {

    Category.find({}).exec((err, data)=>{
        if (err) {
            return res.status(400).json({
                error:errorHandler(err)
            }) 
        }
        res.json(data)
    })
}


exports.categoryId = (req, res, next, id) => {
    Category.findById(id)
        .exec((err, cate)=>{
            if(err || !cate){
                return res.status(400).json({
                    error:"Category not Found!"
                })
            }
            req.category = cate
            next();
        })
}

exports.read = (req, res) => {

    return res.json(req.category)
}


exports.remove = (req, res) => {

    let category = req.category;
    category.remove((err, deletedCategory)=>{
        if (err) {
            return res.status(400).json({
                error:errorHandler(err)
            }) 
        }
        res.json({
            deletedCategory,
            message:"Category Deleted Successfully!"
        })
    })
}




exports.update = (req, res) => {

    // validating
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ error: errors.array()[0].msg })
    }

    let category = req.category;

    category.update(req.body, (err, updatedCategory)=>{
        if (err) {
            return res.status(400).json({
                error:errorHandler(err)
            }) 
        }
        res.json({
            message:"Category Updated Successfully!"
        })
    })
}
