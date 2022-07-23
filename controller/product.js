const Product = require("../models/product");
const slugify = require("slugify");

exports.addProduct = async(req, res) => {
    try{
        const {name, price, description, category, quantity} = req.body;
        let productPictures = [];
        if(req.files.length > 0){
            productPictures = req.files.map(file => {
                return {img : file.filename}
            })
        }
        const product = new Product({
            name,
            slug : slugify(req.body.name),
            price,
            quantity, 
            description, 
            productPictures,
            category, 
            createdBy : req.user._id
        });

        const result = await product.save();
        res.status(200).json({
            status : "Success",
            result : result
        })
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            status : "failure",
            message : err
        })
    }


    // res.status(200).json({file : req.files, body : req.body});
}