const Category = require("../models/category");
const slugify = require("slugify");

// function to fetch the categories
function getFullCategoryList(categories, parentId = null){
    // console.log(categories);
    const categoryList = [];
    let category;
    if(parentId == null){
        category = categories.filter(cat => cat.parentId == undefined);
        console.log(category);
    }
    else{
        category = categories.filter(cat => cat.parentId == parentId);
    }
    for(let i of category){
        categoryList.push({
            _id : i._id,
            name : i.name,
            slug : i.slug,
            children : getFullCategoryList(categories, i._id)
        });
    }
    return categoryList;
}


exports.addCategory = async(req, res) => {
    try{
        const categoryObj = {
            name : req.body.name,
            slug : slugify(req.body.name)
        }

        if(req.file){
            console.log("Bhai yaha tk to aa gaya hu mai");
            categoryObj.categoryImage = process.env.API + "public/" + req.file.filename;
        }

        if(req.body.parentId){
            categoryObj.parentId = req.body.parentId;
        }

        const cat = new Category(categoryObj);
        const result = await cat.save();
        res.status(201).json({
            Status : "Success",
            data : result
        });
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            message : "Something went wrong",
            error : err 
        })
    }
}

exports.getCategories = async(req, res) => {
    try{
        const categories = await Category.find();
        // console.log(categories);
        if(categories){
            const categoryList = getFullCategoryList(categories);
            res.status(200).json({
                Status : "Success",
                categories : categoryList
            });
        }
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            status : "failure",
            error : err
        });
    }
}