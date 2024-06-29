const mongoose=require("mongoose")

const userschema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    age:{type:Number,required:true},
    role:{type:Array,required:true}
},{
    versionKey:false,
    timestamps: true
})
const usermodel=mongoose.model("userdata",userschema)
module.exports=usermodel