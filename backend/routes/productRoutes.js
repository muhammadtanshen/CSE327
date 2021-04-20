const express = require('express');
const router = express.Router();

const Product  =  require('../models/productModel');
const productController = require('../controllers/productController');
const protectAuthMiddleWare = require('../../middlewares/authMiddlware');
const adminUserMiddlWare = require('../../middlewares/adminUser');

//top rated products
router.get('/top',productController.getTopProducts);

router.get('/',productController.getAllProduct);

router.get('/:id',productController.getSingleProduct);



//product review
router.post('/:id/reviews',protectAuthMiddleWare,productController.createProductReview);



//delete product
router.delete('/:id',protectAuthMiddleWare,adminUserMiddlWare.admin,productController.deleteProduct)

//cereate product
router.post('/',protectAuthMiddleWare,adminUserMiddlWare.admin,productController.createProduct);
//Update product
router.put('/:id',protectAuthMiddleWare,adminUserMiddlWare.admin,productController.updateProduct);
module.exports = router;
