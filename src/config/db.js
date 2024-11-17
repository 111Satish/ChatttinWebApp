const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://satishjnvr:qEyy9BR9_xjc3VQ@cluster0.e7sno.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'); 
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
