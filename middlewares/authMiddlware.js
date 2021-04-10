const jwt = require('jsonwebtoken');
const User = require('../backend/models/userModel');
const asyncHandler = require('express-async-handler');
const protect =  asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        //console.log("token found");
        try{
            token =req.headers.authorization.split(' ')[1];
            const decode  = jwt.verify(token,process.env.JWT_SECRET);
            console.log('Decode',decode);
            req.user = await User.findById(decode.id).select('-password');//.select('-email -password')
            console.log('User',req.user);
            next();
        }catch(error){
            console.error(error);
            res.status(401);
            throw new Error('NO match  token or may be expire.');
        }
    }
    if(!token){
        res.status(401);
        throw new Error('Not Authorized,No token');
    }
    
})

module.exports = protect;