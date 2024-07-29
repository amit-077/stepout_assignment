const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    let data = await mongoose.connect(process.env.MONGO_URI);
    if (data) {
      console.log("Database connected");
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { connectDB };
