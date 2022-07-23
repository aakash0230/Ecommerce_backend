const express = require("express");
const { requireSignIn, adminMiddleware } = require("../common-middleware");
const { addCategory, getCategories } = require("../controller/category");
const router = express.Router();
const multer = require("multer");
const path=  require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: function (req, file, cb) {
      cb(null,Date.now() + '-' + file.originalname );
    }
})
  
const upload = multer({storage});

router.post("/category/create", requireSignIn, adminMiddleware, upload.single("categoryImage"), addCategory);
router.get("/category/getcategories", getCategories);

module.exports = router;