const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const Product  =  require('../models/productModel');
const productController = require('../controllers/productController');

router.get('/',productController.getAllProduct);

router.get('/:id',productController.getSingleProduct);


module.exports = router;