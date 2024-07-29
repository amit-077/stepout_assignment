const { Booking } = require("../db/models/Booking");

const getSpecificTrain = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findOne({ _id: bookingId }).populate(
      "trainID"
    );
    console.log(booking);
    if (booking) {
      res.status(200).send({
        bookingId: booking._id,
        trainId: booking.trainID._id,
        trainName: booking.trainID.name,
        userId: booking.userId,
        noOfSeats: booking.seatsBooked,
        seats: booking.seats,
        arrivalTime: booking.trainID.arrivalTime,
        destinationTime: booking.trainID.destinationTime,
      });
    } else {
      res.status(400).send("An error occured");
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getSpecificTrain };
