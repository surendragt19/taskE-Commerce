const express=require('express')
const router=express.Router()
const {addtoCartController,viewCardControll,orderCardController,orderHistoryController}=require('../controller/cart.controller')
const authMiddleware=require('../middleWear/auth.middlewear')

router.post('/addCart',authMiddleware,addtoCartController)

router.get('/cartView',authMiddleware,viewCardControll)

router.post('/order',authMiddleware,orderCardController)

router.get('/confirmation', authMiddleware, (req, res) => {
    res.render('confirmOrder');
});

router.get('/orderHistory', authMiddleware, orderHistoryController);
module.exports=router;