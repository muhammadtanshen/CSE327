const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');

exports.getAllProduct = asyncHandler(async(req,res)=>{
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
    const count = await Product.countDocuments({...keyword});
    const products = await Product.find({...keyword}).limit(pageSize)
    .skip(pageSize * (page - 1))
;

    res.json({products,page,pages:Math.ceil(count/pageSize)});
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

exports.deleteProduct = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    
    if(product){
        await product.remove();
        res.json({message:'Product Remove Successfully.'})
    }else{
        res.status(400);
        throw new Error('Product not found.');
    }
})


exports.createProduct = asyncHandler(async(req,res)=>{
    const product = new Product({
        name:'sample Name',
        image:'/images/sample.jpg',
        user:req.user._id,
        price:0,
        brand:'sample Brand',
        category:'sample category',
        description:'sample description',
        numOfReviews:0,
        countInStock:0
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
})


exports.updateProduct = asyncHandler(async(req,res)=>{
    const {name,
        price,
        image,
        brand,
        category,
        description,
        countInStock} = req.body;
    const product = await Product.findById(req.params.id);
    if(product){
        product.name = name;
        product.image = image;
        product.price = price;
        product.brand = brand;
        product.category = category;
        product.description = description;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.status(201).json(updatedProduct);
    }else{
        res.status(404);
        throw new Error("Product Not Found.")
    }
})



exports.createProductReview = asyncHandler(async(req,res)=>{
    const {rating,comment} = req.body;
    const product = await Product.findById(req.params.id);
    if(product){
        const alreadyReview = product.review.find(r=>r.user.toString() === req.user._id.toString());
        if(alreadyReview){
            res.status(400);
            throw new Error("Product already reviewed.")
        }
        const review = {
            name:req.user.name,
            rating:Number(rating),
            comment,
            user:req.user._id
        }
        product.review.push(review);
        product.numOfReviews = product.review.length;
        product.rating = product.review.reduce((acc,item)=>item.rating+acc,0)/product.review.length;
        await product.save()
        res.status(201).json({message:"Revies Added."});
    }else{
        res.status(404);
        throw new Error("Product Not Found.")
    }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
exports.getTopProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find({}).sort({rating:-1}).limit(4);
    res.json(products);
})
