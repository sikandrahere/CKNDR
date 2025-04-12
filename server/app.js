import express, { urlencoded } from "express"
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from "./src/routes/user.routes.js"
import adminRouter from "./src/routes/admin.routes.js"
import productRouter from "./src/routes/products.routes.js"
import CartRouter from "./src/routes/cart.routes.js"
import FavouriteRouter from "./src/routes/favourite.routes.js"
import AddressRouter from "./src/routes/address.routes.js"
import UserOrderRouter from "./src/routes/userOrder.routes.js"
import AdminOrderRouter from "./src/routes/adminOrder.routes.js"


import dotenv from "dotenv";
dotenv.config();


const app= express()
app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(cookieParser())
app.use(
    cors({
        origin:process.env.CLIENT_URL || 'http://localhost:5173', 
        credentials: true, 
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization','Cache-Control','Expires','Pragma'],
    })
);

app.get('/',(req,res)=>{
    res.send("welcome to home page")
})
// user routes
app.use('/user',userRouter)
// admin routes
app.use('/admin',adminRouter)
// product routes
app.use('/product',productRouter)
// cart routes
app.use('/cart',CartRouter)
// fav routes
app.use('/favourite',FavouriteRouter)
// address routes
app.use('/address',AddressRouter)
// user order routes
app.use('/user-order',UserOrderRouter)
// admin order routes
app.use('/admin-order',AdminOrderRouter)


app.use((err, req, res, next) => {
    // Log the error for debugging
    console.error('Error Stack:', err.stack);

    // Ensure the response is JSON
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        errors: err.errors || [],
        data: err.data || null,
    });
});

export default app;