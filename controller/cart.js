const Cart = require("../models/cart");
const user = require("../models/user");

exports.addItemToCart = async(req, res) => {
    try{
        const cartExist = await Cart.findOne({user : req.user._id})
        if(cartExist){
            const item = cartExist.cartItems.find(c => c.product == req.body.cartItems.product);
            if(item){
                console.log("Dusare if ke andar aa gaya hoon");
                console.log(item.quantity);
                const result = await Cart.findOneAndUpdate(
                    {
                        user : req.user._id,
                        "cartItems.product" : req.body.cartItems.product
                    },
                    {
                        "$set" : {
                            "cartItems.$" : {
                                ...req.body.cartItems,
                                quantity : item.quantity + req.body.cartItems.quantity
                            }
                        }
                    }
                );
                res.status(200).json({
                    Status : "Success",
                    result : result
                })
            }
            else{
                const result = await Cart.findOneAndUpdate(
                    {user : req.user._id},
                    {"$push" : 
                        {cartItems : req.body.cartItems}
                    }
                )
                res.status(200).json({
                    status : "Success",
                    result : result
                })
            }
        }
        else{
            const cart = new Cart({
                user : req.user._id,
                cartItems : [req.body.cartItems]
            })
            const result = await cart.save();
            res.status(200).json({
                status : "success", 
                result : result
            })
        }
    }
    catch(err){
        console.log(err);
        res.status(200).json({
            status : "Success",
            message : "Something went wrong"
        })
    }
}