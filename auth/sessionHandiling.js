function isLogin(req,res,next){
    if(req.session.userId){
        next();
     }else{
         res.redirect('/To-do');
     }
}

function isLogOut(req,res,next){
    if(req.session.userId){
       res.redirect('/home')
    }else{
        next();
         

    }
}

module.exports={
    isLogOut,
    isLogin
}