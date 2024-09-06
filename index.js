const express=require('express')
const app=express()
 require('dotenv').config()
const path=require('path')
const userRouter=require('./routes/userRouter')

app.set('ejs',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'public')))

app.use("/",userRouter)


app.listen(3000)