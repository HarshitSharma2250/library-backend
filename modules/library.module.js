const mongoose=require("mongoose")
const libraryschema=mongoose.Schema({
    title:{type:String,require:true},
    author:{type:String,require:true},
    description:{type:String,require:true},
    ISBN:{type:String,require:true},
    Publisher:{type:String,require:true},
    PublicationDate:{type:String,require:true},
    Language:{type:String,require:true},
    adminName:{type:String,require:true},
    adminId:{type:String,require:true}
},{
    versionKey:false,
    timestamps:true
})
const librarymodel=mongoose.model("librarydata",libraryschema)
module.exports=librarymodel