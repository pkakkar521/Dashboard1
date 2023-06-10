const express = require('express')
const cors =require("cors");
const morgan=require("morgan")
const dotenv=require('dotenv')
const colors=require('colors')
const mongoose=require('mongoose')
require('./db/config');
const User = require('./db/User')
const Products = require('./db/Product')
const Personal = require('./db/Personal')
const BASE_URL = process.env.BASE_URL

const app=express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.post("/register",async(req,resp)=>{
    let user=new User(req.body);
    let result=await user.save();
    result=result.toObject();
    delete result.password
    resp.send(result);
})
app.post("/reg",async(req,resp)=>{
    let user=new Personal(req.body);
    let result=await user.save();
    result=result.toObject();
    resp.send(result);
})

app.post("/login",async(req,resp)=>{
    if(req.body.password && req.body.name){
        let user=await User.findOne(req.body).select("-password");

        if(user){resp.send(user);}
        else{resp.send({result:"no user"})}
    }
    else{resp.send({result:"no user"}) }

})
app.post("/commerce" ,async(req,resp)=>{
    let pro= new Products(req.body);
    let result = await pro.save();
    resp.send(result);
})
app.get("/product",async(req,resp)=>{
let product = await Products.find();
if(product.length>0){
    resp.send(product)
}
else{resp.send({result : "no product"})}
})
app.delete("/product/:id",async(req,resp)=>{

const result=await Products.deleteOne({_id:req.params.id});
resp.send(result);
})
app.get("/product/:id" , async(req,resp)=>{
    const result=await Products.findOne({_id:req.params.id});
    if(result){resp.send(result)}
    else{resp.send({result:"no products"})}
})
app.put("/product/:id" , async(req,resp)=>{
    const result=await Products.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
        )
        resp.send(result);
})



app.listen('${BASE_URL}')