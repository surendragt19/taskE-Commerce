const express=require('express')
const router=express.Router()
const {registerController,loginController}=require('../controller/user.controller')

router.post('/register',registerController)

router.post('/login',loginController)

router.get('/logout',(req,res)=>{
    res.clearCookie('token')
    res.redirect('/login')
})

router.get('/',(req,res)=>{
    res.render('register')
})

router.get('/login',(req,res)=>{
    res.render('login')
})




module.exports=router;