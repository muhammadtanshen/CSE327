exports.admin = (req,res,next)=>{
    if(req.user && req.user.isAdmin){
       next(); 
    }else{
        res.status(401);
        throw new Error("NOt autorize or NOt a admin😡🗯.")
    }
}