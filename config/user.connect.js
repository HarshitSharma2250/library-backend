const mongoose=require("mongoose")
const UserConnection=mongoose.connect("mongodb+srv://sharmaharshit295:Harshit2250@cluster0.rs4eabk.mongodb.net/librarydata?retryWrites=true&w=majority&appName=Cluster0")

module.exports=UserConnection