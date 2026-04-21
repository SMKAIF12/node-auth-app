const isAdminUser = (req,res,next)=>{
    if(req.userInfo && req.userInfo.role !== 'admin'){
        return res.status(401).json({success:false,message:'Access denied. You are not admin'})
    }
    next();
}
module.exports=isAdminUser;