const express = require("express");
const { signUp, signIn, } = require("../controller/auth");
const router = express.Router();
const { validateSignUpRequest, isRequestValidated, validateSignInRequest } = require("../validator/auth");

router.post("/signup", validateSignUpRequest, isRequestValidated, signUp);
router.post('/signin', validateSignInRequest, isRequestValidated, signIn);

// router.post("/profile", requireSignIn, (req, res) => {
//     res.status(200).json({user : "profile"});
// })

module.exports = router;