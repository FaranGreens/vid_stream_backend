const mongoose = require('mongoose');

async function connectDB(){
    try {
        console.log("Connecting to MongoDB");
        await mongoose.connect('mongodb+srv://faran:faran@cluster0.hzctxpb.mongodb.net/moviesDB?appName=mongosh+1.7.1', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("connected to db");
      } catch (error) {
        console.log(error);
      }
}

module.exports = connectDB;