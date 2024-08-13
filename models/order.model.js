const mongoose=require('mongoose')

const orderSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    total:{
        type:Number,
        required:true,
    },
    items:[{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product',
            required:true 
        },
        quantity:{
            type:Number,
            required:true,
        },
    }
    ],


},{timestamps: true})

const Order=mongoose.model('Order',orderSchema)
module.exports=Order

