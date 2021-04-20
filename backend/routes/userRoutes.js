const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const protectAuthMiddlware = require('../../middlewares/authMiddlware');
const User = require('../models/userModel');
const adminUserMiddlWare = require('../../middlewares/adminUser');


router.post('/',userController.registerUser);
router.post('/login',userController.authUser);
router.get('/profile',protectAuthMiddlware,userController.getUserProfile);
router.put('/profile',protectAuthMiddlware,userController.updateUserProfile);

router.get('/',protectAuthMiddlware,adminUserMiddlWare.admin,userController.getUsers);
router.delete('/:id',protectAuthMiddlware,adminUserMiddlWare.admin,userController.deleteUser);
router.get('/:id',protectAuthMiddlware,adminUserMiddlWare.admin,userController.getUserById);
router.put('/:id',protectAuthMiddlware,adminUserMiddlWare.admin,userController.updateUser);


module.exports = router;
