const express = require("express");
const Product = require("../models/Product");
const router = express();

router.post("/productDetails", async (req, res) => {
  const { sellerName, mobile, productName, productImg, productDet } = req.body;
  const result = await Product.create({
    sellerName,
    mobile,
    productName,
    productImg,
    productDet,
  });

  return res.status(201).json({msg : "Product details added successfully!", result})
});

module.exports = router;