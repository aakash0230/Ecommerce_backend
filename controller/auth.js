const User = require("../models/user");
const jwt = require("jsonwebtoken");
// const {validationResult} = require("express-validator");

exports.signUp = async(req, res) => {
    try{
        console.log("Inside user signUp");
        const userExists = await User.findOne({email : req.body.email})
        if(userExists){
            return res.status(400).json({
                message : "User with this email already exists"
            });
        }
        else{
            const {
                firstName,
                lastName,
                email,
                password,
            } = req.body;

            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                userName : Math.random().toString(),
                role: 'user'
            });

            const result = await _user.save();
            res.status(201).json({
                status : "User account created successfully",
                data : result
            });
        }
        
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            message : "Something went wrong",
            error : err
        })
    }  
}

exports.signIn = async(req, res) => {
    try{
        const user = await User.findOne({email : req.body.email});
        if(user){
            if(user.authenticate(req.body.password) && user.role === 'user'){
                const token = jwt.sign({_id : user._id, role : user.role}, process.env.JWT_SECRET, {expiresIn : '1h'});
                const {firstName, lastName, email, role, fullName} = user;
                res.status(200).json({
                    status : "User logged in successfully",
                    token : token,
                    data : {
                        id : user._id, firstName, lastName, email, role, fullName
                    }
                });
            }
            else{
                return res.status(400).json({
                    status : "Failure",
                    message : "Invalid password"
                });
            }
        }
        else{
            return res.status(400).json({message : "User with this email does not exists"});
        }
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            Status : "Failure",
            Message : "Something went wrong"
        });
    }
}

    