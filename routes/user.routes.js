const express=require("express")
const userroutes=express.Router()
const {register,login} =require("../controllers/user.controller")

userroutes.post("/register",register)

userroutes.post("/login",login)



module.exports=userroutes