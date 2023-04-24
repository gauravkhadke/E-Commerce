const express = require("express");
var cors = require('cors')
require("./dbs/Config")
const User = require("./dbs/User")
const Product = require("./dbs/Product")
const app = express()

app.use(express.json())
app.use(cors())

app.post("/register",async(req, res)=>{
    let data = new User(req.body);
    let userData = await (data.save()) 
    console.log(userData)
    res.send(userData) 
    
})
app.post("/login",async(req,res)=>{
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password")
        if(user){
            res.send(req.body)
        }else{
            res.send({data:"data not found"})   
        }
    }else{
        res.send({data:"data not found"})   
    }
   
})
   
app.post("/add-product",async(req,res)=>{
    let productData = new Product (req.body);
    let data = await productData.save();
    res.send(data)
})
app.listen(5000)     