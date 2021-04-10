const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('../backend/config/db');
const colors = require('colors');
const products = require('../backend/data/products');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const errorMiddleWare = require('../middlewares/errorMiddleWare');



dotenv.config();
connectDB();
const app = express();

// app.use((req,res,next)=>{
//     console.log(req.originalUrl);
//     next();
// })

app.use(express.json());


app.get('/',(req,res)=>{
    res.send('Hello I am the main page..');
})

app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);

app.use(errorMiddleWare.notFound);

app.use(errorMiddleWare.errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`Server runing on ${process.env.NODE_ENV} port ${process.env.PORT}`.yellow.bold));