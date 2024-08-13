const User=require('../models/user.models')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const registerController=async(req,res)=>{
    const {name,password,email}=req.body;
    try {
        if(!name || !password || !email){
            return res.status(400).json({message:'All Field Required'})
        }
        const existUser=await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:'User Already Register'})
        }
        const saltRound=10
        const hashPassword=await bcrypt.hash(password,saltRound)

        const createUser=await User.create({
            name,
            password:hashPassword,
            email
        })
        res.redirect('/user/login')
    } catch (error) {
        return res.status(500).json({message:'Server Error'})
    }
}


const loginController=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:'Invalid Email'})
        }
        const isMatchPassword=await bcrypt.compare(password,user.password)
        if(!isMatchPassword){
            return res.status(400).json({message:'Invalid pasword'})
        }
        //jwt
        const token=jwt.sign({userId:user._id,isAdmin:user.isAdmin},process.env.SEC_KEY,{expiresIn:'1h'})
        res.cookie('token',token)
        res.redirect('/product/viewProduct')
    } catch (error) {
        return res.status(500).json({message:'Server Error'})   
    }
}

module.exports={registerController,loginController}