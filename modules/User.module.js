const mongoose=require("mongoose")

const userschema=mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    age:{type:Number,require:true},
    role:{type:Array,require:true}
},{
    versionKey:false,
    timestamps: true
})
const usermodel=mongoose.model("userdata",userschema)
module.exports=usermodel