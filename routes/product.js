const express = require("express");
const { requireSignIn, adminMiddleware } = require("../common-middleware");
const { addProduct} = require("../controller/product");
const multer = require("multer");
const router = express.Router();
const path = require("path");
// const { nanoid } = require("nanoid");
// import {nanoid} from "nanoid";

// console.log(path.dirname(__dirname));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: function (req, file, cb) {
      cb(null,Date.now() + '-' + file.originalname );
    }
})
  
const upload = multer({storage});

router.post("/product/create", requireSignIn, adminMiddleware, upload.array('productPicture'), addProduct);
// router.get("/category/getcategories", getCategories);

module.exports = router;