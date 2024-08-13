const express=require('express')
const router=express.Router()
const isAdminMiddlewear=require('../middleWear/isAdmin.middlewear')
const {addProductController,viewProductController}=require('../controller/product.controller')

router.post('/addProduct',isAdminMiddlewear,addProductController)
router.get('/viewProduct',viewProductController)

router.get('/addProduct',isAdminMiddlewear,(req,res)=>{
    res.render('addProduct')
})
module.exports=router;