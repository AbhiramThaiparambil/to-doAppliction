const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRouter");
const mongoose=require('mongoose')
const session=require('express-session')
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("ejs", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret:'this is Secret',
    resave: true,
    saveUninitialized: false,
  })
);

app.use("/", userRouter);

mongoose.connect(process.env.mongodbConnect).then(()=>{
  console.log('DB successfull');
  
}).catch((e)=>{
  console.log(e);
  
})



app.listen(process.env.PORT, () => {
  console.log("server is running in " + process.env.PORT);
});
