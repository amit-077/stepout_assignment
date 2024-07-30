const { Train } = require("../db/models/Train");

const addTrain = async (req, res) => {
  try {
    const {
      name,
      source,
      destination,
      capacity,
      arrivalTime,
      destinationTime,
    } = req.body.train;

    if (
      !name ||
      !source ||
      !destination ||
      !capacity ||
      !arrivalTime ||
      !destinationTime
    ) {
      return res.status(402).send("Please enter all fields");
    }

    const trainId = req.body.trainId || null;

    if (trainId) {
      let data = await Train.findByIdAndUpdate(trainId, {
        name,
        source,
        destination,
        capacity,
        arrivalTime,
        destinationTime,
      });
      if (data) {
        return res.status(203).send("Train Updated");
      }
    }

    const newTrain = await Train.create({
      name,
      source,
      destination,
      capacity,
      arrivalTime,
      destinationTime,
    });

    if (newTrain) {
      res
        .status(200)
        .send({ message: "Train added successfully!", train_id: newTrain._id });
    }
    console.log("Train added successfully");
  } catch (e) {
    console.log(e);
    res.status(401).send("Error while adding train");
  }
};

module.exports = { addTrain };
