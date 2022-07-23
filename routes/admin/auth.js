const express = require("express");
const { signUp, signIn, } = require("../../controller/admin/auth");
const { validateSignUpRequest, isRequestValidated, validateSignInRequest } = require("../../validator/auth");
const router = express.Router();

router.post('/admin/signin', validateSignInRequest, isRequestValidated, signIn);
router.post("/admin/signup", validateSignUpRequest, isRequestValidated, signUp);

// router.post("/profile", requireSignIn, (req, res) => {
//     res.status(200).json({user : "profile"});
// })

module.exports = router