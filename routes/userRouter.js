const userRouter=require('express').Router()
const user = require('../model/user')
const User=require('../model/user')

userRouter.get('/',(req,res)=>{
   
    res.send('hello')


});
module.exports=userRouter