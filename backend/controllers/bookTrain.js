const mongoose = require("mongoose");
const { Booking } = require("../db/models/Booking");
const { Train } = require("../db/models/Train");

const bookTrain = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { seats } = req.body;
    const userId = req.user;
    const { trainId } = req.params;

    const currentTrain = await Train.findOne({ _id: trainId }).session(session);
    if (!currentTrain) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).send("Train not found");
    }
    let trainCapacity = Number(currentTrain.capacity);

    if (trainCapacity >= seats) {
      trainCapacity = trainCapacity - seats;
    } else {
      await session.abortTransaction();
      session.endSession();
      return res.status(401).send("Not enough capacity");
    }

    let seatsBooked = [];
    for (let i = trainCapacity; i > trainCapacity - seats; i--) {
      seatsBooked.push(i);
    }

    const trainBooked = await Booking.create(
      [
        {
          trainID: trainId,
          userId,
          seatsBooked: seats,
          seats: seatsBooked,
        },
      ],
      { session }
    );

    const updateSeats = await Train.findByIdAndUpdate(
      trainId,
      {
        capacity: trainCapacity,
      },
      { new: true, session }
    );

    if (!updateSeats) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).send("Booking conflict, try again");
    }

    console.log(updateSeats);

    if (trainBooked) {
      await session.commitTransaction();
      session.endSession();
      res.status(200).send({
        message: "Train booked successfully!",
        bookingId: trainBooked._id,
        seats: trainBooked.seats,
      });
    }
  } catch (e) {
    console.log(e);
    await session.abortTransaction();
    session.endSession();
    res.status(402).send("An error occured");
  } finally {
    session.endSession();
  }
};
module.exports = { bookTrain };
