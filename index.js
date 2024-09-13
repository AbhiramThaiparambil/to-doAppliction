const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRouter");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("ejs", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", userRouter);


app.listen(process.env.PORT, () => {
  console.log("server is running in " + process.env.PORT);
});
