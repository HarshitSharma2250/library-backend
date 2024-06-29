const express=require("express")
const userroutes=express.Router()
const {register,login} =require("../controllers/user.controller")
const cors = require('cors');
userroutes.use(cors());

userroutes.post("/register",register)

userroutes.post("/login",login)



module.exports=userroutes