const userRouter=require('express').Router()
const user = require('../model/user')
const userController=require('../controller/userController')

userRouter.get('/',userController.toDo)
userRouter.get('/home',userController.home)

userRouter.get('/login',userController.login)
userRouter.post('/loginData',userController.loginData) 
    



userRouter.post('/registerData',userController.regData)
  

module.exports=userRouter