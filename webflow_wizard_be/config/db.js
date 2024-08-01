const mongoose = require("mongoose");

// Make connection to MongoDB
const connectToMongoDB = async () => {
  try {
    const uri = "mongodb://localhost:27017";
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    });

    console.log("Connected to MongoDB...");
  } catch (err) {
    console.error(err.message);
    // Terminate the application
    process.exit(1);
  }
};


module.exports = connectToMongoDB;
