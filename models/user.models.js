const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        uniquie:true,
    },
    email:{
        type:String,
        required:true,
        uniquie:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

},{timestamps: true})

const User=mongoose.model('User',userSchema)
module.exports=User