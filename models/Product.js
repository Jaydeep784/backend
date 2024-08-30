const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    sellerName : {
        type: String, 
        require: true, 
    }, 
    mobile : {
        type: Number, 
        require : true, 
    }, 
    productName : {
        type: String, 
        require: true,
    }, 
    productImg : {
        type: String, 
        require : true, 
    }, 
    productDet : {
        type: String, 
        require: true, 
    }
}, {timestamps : true})

const Product = mongoose.model("products", ProductSchema);

module.exports = Product;