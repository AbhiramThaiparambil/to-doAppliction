const mongoose=require('mongoose');
const { type } = require('os');

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:true
    },email:{
        type:String,
        require:true,
    },Password:{
        type:String,
        require:true
    },
    createAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("User",userSchema)