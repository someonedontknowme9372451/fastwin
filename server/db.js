const mongoose = require('mongoose');
const URI = process.env.DB_URI;
const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Default is 30 seconds; adjust as needed
};
const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log('Connected to MongoDB'); // Move this statement here
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1); // Exit with a non-zero code to indicate failure
  }
};

module.exports = connectDB;
