const jwt =require("jsonwebtoken")
const bcrypt = require('bcrypt');
const users=require("../modules/User.module")




const register=async(req,res)=>{
    const{name,email,password,age,role}=req.body;

    bcrypt.hash(password, 5, async function(err, hash) {
        if(err){
            res.status(404).send(`something went wrong while registration`)
        }
        if(hash){
            const data=new users({name,email,password:hash,age,role})
            await data.save()
            res.status(400).json({ message: 'All fields are required' });
        }else{
            res.status(404).json(`something went wrong during hashing password`)
        }
    });
};

const login=async(req,res)=>{
    const{email,password}=req.body
const finduser=await users.findOne({email})
if(!finduser){
return res.status(404).send(`invalid credentials`)
}
bcrypt.compare(password, finduser.password, function(err, result) {
   if(err){
    res.status(404).send(`semthing went error while login`)
   }
   if(result){
    const  accessToken = jwt.sign({name:finduser.name,myId:finduser._id,role:finduser.role}, 'masai',{expiresIn:"1m"});
    const  refreshToken = jwt.sign({name:finduser.name,myId:finduser._id,role:finduser.role}, 'masaischool',{expiresIn:"1d"});
    res.status(404).json({"mess":`loggin successfull`,"accessToken":accessToken,"refreshToken":refreshToken})
   }else{
    res.status(404).json(`semthing went error while generating token`)
   }
});
}
module.exports={register,login}