const asyncHandler=(requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }
}



export {asyncHandler}


// const asynHandler=()=>{}
// const asynHandler=(func)=>()=>{}
// const asynHandler=(func)


// const asyncHandler=(fn)=>async(req,req,next)=>{
//     try{
//         await fn(req,res,next)
//     }
//     catch(error){
//         res.status(error.code || 500).json({
//             success:false;
//             message:err.message
//         })

//     }


// }