const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User=require("../models/UserModel");
const { verify } = require("jsonwebtoken");

exports.isAuthenticatedUser=catchAsyncErrors(async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new ErrorHandler("please login for access this resources",401))
    }
    const decodeData=jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user=await User.findById(decodeData.id);
    next();
})

//admin roles
exports.authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`${req.user.role} can not access this resources`))
        }
        next()
    }
}