const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const generateToken = require('../util/generateToken');

exports.authUser = asyncHandler(async(req,res)=>{
    const {email,password} =   req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }else{
        res.status(401);
        throw new Error("Invalid email or password.")
    }
})


exports.registerUser = asyncHandler(async(req,res,next)=>{
    const {name,email,password}  = req.body;
    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400);
        throw new Error("User already exist.");
    }
    const user = await User.create({
        name,
        email,
        password
    });
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            isAdmin:user.isAdmin,
            token:generateToken(usr._id)
        });
    }else{
        res.status(400);
        throw new Error("invalid user");
    }
})

exports.getUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        res.json({_id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,})
    }else{
        res.status(401);
        throw new Error("User not found.");
    }
    res.send("success");
})

exports.updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
  
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.isAdmin = req.body.isAdmin || user.isAdmin
      if (req.body.password) {
        user.password = req.body.password
      }
  
      const updatedUser = await user.save()
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })