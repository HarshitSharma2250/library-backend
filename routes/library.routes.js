const express=require("express")
const libraryRoutes=express.Router()
const librarydata=require("../modules/library.module")
const Auth=require("../middlware/routemiddlware")

libraryRoutes.post("/CREATOR",Auth,async(req,res)=>{
    const {title,author,description,ISBN,Publisher,PublicationDate,Language,adminId,role,adminName}=req.body
    if(role.includes('CREATOR')){
        try {
            const userdata= new librarydata({title,author,description,ISBN,Publisher,PublicationDate,Language,adminId,adminName})
        await userdata.save()
        res.status(400).send(`successfully data generate`)
        } catch (error) {
            res.status(404).send(error.message)
        }
    }else{
        res.status(404).send(`you are not autherized`)
    }
})

libraryRoutes.get("/allData",Auth,async(req,res)=>{
    const {role}=req.body
    if(role.includes('VIEW_ALL')){
        const data=await librarydata.find()
        res.status(400).send(data)
    }else{
        res.status(404).send(`u are not autherized`)
    }
})
libraryRoutes.get("/viewer",Auth,async(req,res)=>{
    const {role}=req.body
    if(role.includes("VIEWER")){
        const data=await librarydata.find()
        res.status(400).send(data)
    }else{
        res.status(404).send(`u are not autherized`)
    }
})

libraryRoutes.delete("/delete/:id",Auth,async(req,res)=>{
    const{role,adminId}=req.body
    const{id}=req.params
    const finduser=await librarydata.findOne({_id:id})
    if(role.includes('CREATOR') && adminId===finduser.adminId){
        await librarydata.findByIdAndDelete(id)
        res.status(400).send(`user successfully deleted`)
    }else{
        res.status(404).send(`you are not asutherized`)
    }
})


libraryRoutes.get("/tilelimitedRoutes",Auth,async(req,res)=>{
    const {old,New}=req.query;
    const{role}=req.body
    if(role.includes('VIEW_ALL')){
        if(old=="1"){
            const accessdate=new Date(Date.now()-10*10*1000)
            const finddata=await librarydata.find({createdAt:{$lt:accessdate}})
            res.status(400).json(finddata);
        }else if(New=="1"){
            const accessDate=new Date(Date.now()-10*60*1000)
            const findData=await librarydata.find({createdAt:{$gt:accessDate}})
            res.status(400).json(findData)
        }
        else{
            res.json({ message: 'Invalid query parameter' });
        }
    }else{
        res.status(404).send(`you are not asutherized`)
    }
})



module.exports=libraryRoutes