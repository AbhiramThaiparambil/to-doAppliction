const User = require('../model/user');
const bcrypt = require('bcrypt');



let toDo = async (req, res) => {
    try {
        res.render('toDo.ejs');
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'An error occurred while rendering the toDo page.' });
    }
};

let login = (req, res) => {
    res.render('login.ejs');
};


let home = async (req, res) => {
    try {
        res.render('home.ejs');
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'An error occurred while rendering the toDo page.' });
    }
};

let loginData = async (req, res) => {
    try {
        const { emailLogin, loginPassword } = req.body;

        if (!emailLogin || !loginPassword) {
            return res.status(400).json({ message: 'Please provide both email and password.' });
        }

        const userdata = await User.findOne({ email: emailLogin });
        if (userdata) {
            const isMatch = await bcrypt.compare(loginPassword, userdata.Password);

            if (isMatch) {
                req.session.userId = userdata._id;
                console.log('home');
                            // res.status(200) .json({ message: 'redirctHome' });

                res.redirect('/home');
            

            } else {
                res.status(400).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(400).json({ message: 'User does not exist' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'An error occurred while processing login.' });
    }
};

let regData = async (req, res) => {
    try {
        const { fullName, emailRegister, registerPassword } = req.body;

        if (!fullName || !emailRegister || !registerPassword) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }

        const isExist = await User.findOne({ email: emailRegister });

        if (isExist) {
            return res.status(400).json({ message: 'This email is already registered. Login instead.' });
        }

        const hashPass = await bcrypt.hash(registerPassword, 10);

        const user = new User({
            userName: fullName,
            email: emailRegister,
            Password: hashPass
        });

        const saved = await user.save();

        if (saved) {
            req.session.userId = saved._id;
            // res.status(200).json({ message: 'redirctHome' });
        } else {
            res.status(400).json({ message: 'Sorry for the inconvenience, please try again.' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'An error occurred while processing registration.' });
    }
};

module.exports = {
    home,
    login,
    loginData,
    regData,
    toDo
};
