const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  capacity: {
    type: String,
    required: true,
  },
  arrivalTime: {
    type: String,
    required: true,
  },
  destinationTime: {
    type: String,
    required: true,
  },
});

const Train = mongoose.model("Train", trainSchema);

module.exports = { Train };
