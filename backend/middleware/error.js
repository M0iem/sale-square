const ErrorHandler=require('../utils/ErrorHandler')

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500
    err.message=err.message || "Internal server Error"


    // if there is a mongodb error

    if(err.name ==="CastError"){
        const message='Resource not found with this id  ... Invalid '+err.path
        err= new ErrorHandler(message,400) 
    }

    // duplicate key error
     if(err.code===11000){
        const message=`duplicate key ${Object.keys(err.keyValue)} entered`;
        err=new ErrorHandler(message,400)

     }

    //  wrong  jwt error

    if(err.name==="JsonWebTokenError"){
        const message =`Your Url is invalid please try again later`;
        err=new ErrorHandler(message,400);
    }
    // jwt expired

    if(err.name==="TokenExpiredError"){
        const message=`Your Url is expired please try again later `;
        err=new ErrorHandler(message,400);

    }
    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    })
}