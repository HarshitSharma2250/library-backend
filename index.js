const express=require("express")
const server=express()
server.use(express.json())
const dotenv=require("dotenv")
dotenv.config()
const database=require("./config/user.connect")
const PORT=process.env.PORT||8080
const userroutes=require("./routes/user.routes")
server.use("/user",userroutes)
const libraryriutes=require("./routes/library.routes")
server.use("/library",libraryriutes)
const jwt=require("jsonwebtoken")
const morgan = require('morgan')


server.use(morgan(':method :url :status :res[content-length] - :response-time ms :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'))

server.get("/",async(req,res)=>{
    res.send(`welcome to harshit library`)
})


server.post("/token",async(req,res)=>{
    const refreshtoken=req.body.token;
if(!refreshtoken){
    res.status(404).send(`token invalid `)
}
jwt.verify(refreshtoken, 'masaischool', function(err, decoded) {
    if(err){
        res.status(404).send(`something went wrong while verification refresh token`)
    }
    if(decoded){
        const accesstoken=jwt.sign({name:decoded.name,myId:decoded.myId,role:decoded.role},'masai',{expiresIn:'10m'})
        res.status(400).send({"mess":`token successfully generated`,"accesstoken":accesstoken})
    }else{
        res.status(404).send(`please login again`)
    }
  });
})

server.listen(PORT,async()=>{
    try {
        await database;
        console.log(`server is running at port ${PORT}`)
    } catch (error) {
        console.log(error.message)
    }
})