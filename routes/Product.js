const express = require("express");
const Product = require("../models/Product");
const router = express();
// const upload = require("../middlewares/storage")
// import { upload } from '../middlewares/storage';
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

router.post("/productDetails", upload.single('productImg'), async (req, res) => {
  try {
    // Destructure form fields
    const { sellerName, mobile, productName, productDet } = req.body;
    console.log(req.file);
    const productImg = req.file ? req.file.filename : null; // Get filename from multer

    // Create a new product entry
    const result = await Product.create({
      sellerName,
      mobile,
      productName,
      productImg, // Store the image filename
      productDet,
    });

    res.status(201).json({ msg: "Product details added successfully!", result });
  } catch (error) {
    res.status(500).json({ msg: "Error adding product details", error });
  }
});

router.get("/getProducts", async (req, res) => {
  try {
    const result = await Product.find();
    return res.json({ msg: "Products retrieved successfully", result });
  } catch (error) {
    return res.status(500).json({ msg: "Error retrieving products", error });
  }
});

module.exports = router;
