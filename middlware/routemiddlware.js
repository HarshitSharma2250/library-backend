const jwt=require("jsonwebtoken")

const Auth=(req,res,next)=>{
    const token=req.headers.autherization.split(" ")[1]
    if(!token){
        return res.status(404).send(`token not found`)
    }
    try {
        const decoded = jwt.verify(token, 'masai');
    if(!decoded){
        return  res.status(404).send(`you are not autherized or token expired`)
    }
    req.body.adminName=decoded.name;
    req.body.role=decoded.role;
    req.body.adminId=decoded.myId;
next()
    } catch (error) {
        res.status(404).send({"mess":error.message})
    }
}
module.exports=Auth