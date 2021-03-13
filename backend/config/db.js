const mongoose = require('mongoose');

const connectDB  = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,

        });
        console.log(`MongoDB connected on ${conn.connection.host}`.cyan.underline)
    }catch(err){
        console.error(`Error:${err.message}`.red.underline.bold);
        process.exit(1);
    }
}

module.exports = connectDB;


/*

  async dbconnect() {
    try {
      mongoose.connect("mongodb://127.0.0.2/test");
    } catch (error) {
      console.log(errror);
      process.exit(1);
    }

    if (mongoose.connection.readyState == 2) {
      console.log("Db Connected");
    }
  }

*/