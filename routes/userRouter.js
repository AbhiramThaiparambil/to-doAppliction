const userRouter=require('express').Router()
const user = require('../model/user')
const userController=require('../controller/userController')
const{isLogin,isLogOut}=require('../auth/sessionHandiling')

userRouter.get('/',userController.toDo)
userRouter.get('/home',isLogin,userController.home)

userRouter.get('/login',isLogOut,userController.login)
userRouter.post('/loginData',isLogOut,userController.loginData) 
    



userRouter.post('/registerData',isLogOut,userController.regData)
  

module.exports=userRouter