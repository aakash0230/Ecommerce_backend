const jwt = require("jsonwebtoken");

exports.requireSignIn = async(req, res, next) => {
    try{
        if(req.headers.authorization){
            const token = await req.headers.authorization.split(" ")[1];
            const user = jwt.verify(token, process.env.JWT_SECRET);
            console.log(user);
            req.user = user;
            console.log(token); 
        }
        else{
            res.status(400).json({message : "Authorization required"});
        }
        next();
    }
    catch(err){
        console.log(err);
        res.status(401).send("Invalid token");
    }
}

exports.adminMiddleware = async(req, res, next) => {
    try{
        if(req.user.role !== "admin"){
            return res.status(400).json({Message : "Admin Access Denied"});
        }
        console.log("admin middleware tk to aa gaya hu");
        next(); 
    }
    catch(err){
        console.log(err);
        res.status(401).send("Invalid token");
    }
}

exports.userMiddleware = async(req, res, next) => {
    try{
        if(req.user.role !== "user"){
            return res.status(400).json({Message : "User Access Denied"});
        }
        console.log("user middleware tk to aa gaya hu");
        next(); 
    }
    catch(err){
        console.log(err);
        res.status(401).send("Invalid token");
    }
}