const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');

exports.getAllProduct = asyncHandler(async(req,res)=>{
    const products = await Product.find({});
    //throw new Error('some error');
    //console.log(products);
    res.json(products);
})


exports.getSingleProduct = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    
    if(product){
        res.json(product);
    }else{
        res.status(400);
        throw new Error('Product not found.');
    }
})