const mongoose =require('mongoose');
const { type } = require('os');

const contentSchema=new mongoose.Schema({
 
    task:{
        type:String,
        
    },deadline:{
        type:Date
    },completedTime:{
        type:Date
    },status:{
        enum:['pending','complited'],
        default:"pending"
    },createdAt:{
        type:Date,
        default:Date.now
    }
})