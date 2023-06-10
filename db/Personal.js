const mongoose=require('mongoose')

const productSchema =new mongoose.Schema({
        firstname:String,
        lastname:String,
        email:String,
        country:String,
        expectedsalary:String,
        addetail:String
        
    
});
module.exports=mongoose.model("personals",productSchema);