const Product=require('../models/product.model')

const addProductController=async(req,res)=>{
    try {
        const {name,price,quantity}=req.body
        const product=new Product({
            name,price,quantity
        })
        await product.save();
        res.redirect('/product/viewProduct')
    } catch (error) {
        res.status(500).json({message:'Server Error'}) 
    }
}


const viewProductController=async(req,res)=>{
    try {
        const allProduct=await Product.find();
       res.render('addToCart',{allProduct})
    } catch (error) {
        res.status(500).json({message:'Server Error'}) 
    }
}

// const viewProductController = async (req, res) => {
//     try {
//         const productName = "Shirt Mens"; 
//         const allProduct = await Product.findOne({ name: productName }).select('name');
//         if (!allProduct) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.render('addToCart', {allProduct});
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };
module.exports={addProductController,viewProductController}