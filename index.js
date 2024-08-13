const express = require('express')
const dotenv=require('dotenv')
const app = express()
dotenv.config()
const connectDB=require('./config/db')
const userRouter=require('./routes/user.routes')
const cookieParser=require('cookie-parser')
const productRouter=require('./routes/productRoutes')
const cartRouter=require('./routes/cart.route')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.set("view engine","ejs")

app.use('/',userRouter)
app.use('/product',productRouter)
app.use('/cart',cartRouter)




const port=process.env.PORT;
connectDB(process.env.MONGOURL)
.then(()=>{
    console.log("DB Connect")
})
.catch(()=>{
    console.log("Connection Faield")
})
app.listen(port, () => console.log(`app listening on port ${port}!`))

