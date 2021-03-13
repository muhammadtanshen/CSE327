const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const users = require('../backend/data/users');
const products = require('../backend/data/products');
const User = require('../backend/models/userModel');
const Product = require('../backend/models/productModel');
const Order = require('../backend/models/orderModel');
const connectDB = require('../backend/config/db');

dotenv.config();
connectDB();

const importData = async ()=>{
    try{
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map(product=>{
            return {...product, user:adminUser}
        });

        await Product.insertMany(sampleProducts);
        console.log('Data Inserted DOne!'.green.inverse);
        process.exit();
    }catch(error){
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}


const destroyData = async ()=>{
    try{
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        console.log('Data Destroyed DOne!'.red.inverse);
        process.exit();
    }catch(error){
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

if(process.argv[2] === '-d'){
    destroyData();
}else{
    importData();
}