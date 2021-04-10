const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const protectAuthMiddlware = require('../../middlewares/authMiddlware');
const User = require('../models/userModel');

router.post('/',userController.registerUser);
router.post('/login',userController.authUser);
router.get('/profile',protectAuthMiddlware,userController.getUserProfile);
router.put('/profile',protectAuthMiddlware,userController.updateUserProfile);
module.exports = router;