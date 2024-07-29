const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  trainID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Train",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  seatsBooked: {
    type: String,
    required: true,
  },
  seats: {
    type: [String],
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = { Booking };
