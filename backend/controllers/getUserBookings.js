const { Booking } = require("../db/models/Booking");

const getUserBookings = async (req, res) => {
  try {
    let bookings = await Booking.find({ userId: req.user }).populate("trainID");
    if (bookings.length > 0) {
      res.status(200).send({ bookings });
    } else {
      res.status(201).send({ message: "No Bookings" });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getUserBookings };
