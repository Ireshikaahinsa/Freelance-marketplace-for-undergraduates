const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
//const { addCategory, getCategories } = require ('../controller/category');
const { createProject } = require("../controller/project");
const multer = require("multer");
const router = express.Router();
const shortid = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

// destination folder for upload file (middleware)
const upload = multer({ storage });

router.post(
  "/project/create",
  requireSignin,
  adminMiddleware,
  upload.array("projectPicture"),
  createProject
);
//router.get('/category/getcategory' , getCategories);

module.exports = router;
