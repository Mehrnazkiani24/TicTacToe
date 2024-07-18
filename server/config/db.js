const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || "mongodb+srv://a:<a>@cluster0.j7z8x1b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(uri); 
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
