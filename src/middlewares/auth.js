 const adminAuth = (req,res,next)=>{
    console.log("Admin Auth is getting checked");
    const token = "xyz";
    const isAdminAuthorized = token ==="xyz";
    if(!isAdminAuthorized){
        res.status(401).send("unAuthorized request");
    }
    else{
        next();
    }
    
}

const userAuth = (req,res,next)=>{
    console.log("user Auth is getting checked");
    const token = "xyz";
    const isAdminAuthorized = token ==="xyz";
    if(!isAdminAuthorized){
        res.status(401).send("unAuthorized request");
    }
    else{
        next();
    }
    
}

module.exports = {adminAuth,userAuth}