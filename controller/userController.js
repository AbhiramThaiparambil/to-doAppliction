

let home=async (req,res)=>{
   
    res.render('home.ejs')
    
}


let login=(req,res)=>{
    res.render('login.ejs')
}


let loginData=async (req, res) => {
        const {emailLogin,loginPassword } = req.body;
    
       console.log(emailLogin,loginPassword);
       
    
        // if (user && bcrypt.compareSync(loginPassword, user.password)) 
        //     {
        //     res.status(200).json({ message: 'Login successful' });

        // } else {
        //     res.status(401).json({ message: 'Invalid email or password' });
        // }
    }


    let regData=async(req, res) => {
        const { fullName, emailRegister, registerPassword } = req.body;
        
        // if (users.some(u => u.email === emailRegister)) {
        //   return res.status(400).json({ error: 'User already exists' });
        // }
      
   
        
        res.json({ message: 'Registration successful', email: emailRegister });
      };

module.exports={
    home,
    login,
    loginData,
    regData
}


